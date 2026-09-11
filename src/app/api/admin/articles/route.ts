import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OWNER = process.env.GITHUB_OWNER || "aikeruiclean-ship-it";
const REPO = process.env.GITHUB_REPO || "aikeruiclean-site";
const FILE_PATH = "src/lib/guides.ts";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aikerui2026";
const ANCHOR = "const guides: Guide[] = [\n";

interface Section {
  heading: string;
  content: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
}
interface ArticlePayload {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: string;
  thumbnail: string;
  published: string;
  videoId?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  searchIntent?: string;
  cluster?: string;
  relatedGuides?: string[];
  sections: Section[];
}

const q = (s: string) => JSON.stringify(s);

/** 生成符合 guides.ts 风格的 TS 对象字面量 */
function buildTsObject(a: ArticlePayload): string {
  const sectionTs = a.sections
    .map((s) => {
      const lines = [
        `        heading: ${q(s.heading)}`,
        `        content: ${q(s.content)}`,
      ];
      if (s.items && s.items.length) {
        lines.push(`        items: [${s.items.map(q).join(", ")}]`);
      }
      if (s.image) lines.push(`        image: ${q(s.image)}`);
      if (s.imageAlt) lines.push(`        imageAlt: ${q(s.imageAlt)}`);
      return `      {\n${lines.join(",\n")},\n      }`;
    })
    .join(",\n");

  const related = (a.relatedGuides || []).map(q).join(", ");

  const head: string[] = [
    `    slug: ${q(a.slug)}`,
    `    title: ${q(a.title)}`,
    `    description:`,
    `      ${q(a.description)}`,
    `    category: ${q(a.category)}`,
    `    readTime: ${q(a.readTime)}`,
    `    difficulty: ${q(a.difficulty)}`,
    `    thumbnail: ${q(a.thumbnail)}`,
    `    published: ${q(a.published)}`,
  ];
  if (a.videoId) head.push(`    videoId: ${q(a.videoId)}`);
  head.push(`    relatedGuides: [${related}]`);

  return `  {
${head.join(",\n")},
    sections: [
${sectionTs},
    ],
    relatedProducts: [],
  },`;
}

export async function POST(request: NextRequest) {
  // ── 认证 ──
  const bearer = request.headers.get("authorization")?.replace("Bearer ", "");
  if (bearer !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: ArticlePayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "无效的 JSON" }, { status: 400 });
  }

  if (!payload.slug || !payload.title || !payload.sections?.length) {
    return NextResponse.json({ error: "slug / title / sections 必填" }, { status: 400 });
  }

  const tsObject = buildTsObject(payload);

  // ── 无 token：返回代码供复制 ──
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({
      mode: "manual",
      message:
        "未配置 GITHUB_TOKEN —— 复制下面代码，粘到 src/lib/guides.ts 的 `const guides: Guide[] = [` 之后（或交给运营提交）",
      code: tsObject,
    });
  }

  // ── 有 token：走 GitHub API 提交 ──
  try {
    const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "aikerui-workbench",
    };

    const getRes = await fetch(`${api}?ref=${BRANCH}`, { headers });
    if (!getRes.ok) {
      const detail = await getRes.text();
      return NextResponse.json(
        { error: "读取 guides.ts 失败", status: getRes.status, detail: detail.slice(0, 400) },
        { status: 502 }
      );
    }
    const file = (await getRes.json()) as { content: string; sha: string };
    const current = Buffer.from(file.content, "base64").toString("utf8");

    // 去重：slug 已存在则拒绝
    if (current.includes(`slug: ${q(payload.slug)}`)) {
      return NextResponse.json(
        { error: `slug 已存在：${payload.slug}（换一个 slug，或改为更新现有文章）` },
        { status: 409 }
      );
    }

    if (!current.includes(ANCHOR)) {
      return NextResponse.json(
        { error: "未在 guides.ts 找到插入锚点，请确认文件结构未变" },
        { status: 500 }
      );
    }

    const updated = current.replace(ANCHOR, ANCHOR + tsObject + "\n");

    const putRes = await fetch(api, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `content(workbench): add guide "${payload.slug}"`,
        content: Buffer.from(updated, "utf8").toString("base64"),
        sha: file.sha,
        branch: BRANCH,
      }),
    });

    if (!putRes.ok) {
      const detail = await putRes.text();
      return NextResponse.json(
        { error: "提交 GitHub 失败", status: putRes.status, detail: detail.slice(0, 400) },
        { status: 502 }
      );
    }

    const commit = (await putRes.json()) as { commit?: { sha?: string; html_url?: string } };

    return NextResponse.json({
      mode: "auto",
      message: "已提交到 GitHub，Vercel 将自动构建部署（约 2 分钟）",
      slug: payload.slug,
      url: `https://aikeruiclean.com/guides/${payload.slug}`,
      commit: commit.commit?.sha || null,
      commitUrl: commit.commit?.html_url || null,
      next: [
        "等 Vercel 部署完成（约 2 分钟）后访问文章 URL 验证",
        "在 Keyword Map 里补记这条关键词（Primary URL）",
        "更新 llms.txt + 在 2-3 篇老文补反向内链",
        "GSC 请求索引",
      ],
    });
  } catch (e) {
    return NextResponse.json({ error: "服务异常: " + String(e) }, { status: 500 });
  }
}
