import { useEffect, useRef, useState, type ReactNode } from 'react'
import MermaidDiagram from './MermaidDiagram'

function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`fade-in ${delay ? `delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

const skills = {
  Languages: ['TypeScript', 'Go', 'Python'],
  Frontend: ['React', 'Next.js'],
  Backend: ['NestJS', 'Echo', 'FastAPI'],
  Database: ['PostgreSQL', 'Firestore'],
  Infrastructure: ['AWS', 'Terraform'],
  Other: ['Stripe'],
}


const career = [
  { year: '2022.08 – 2022.11', name: '車リース実績集計システム', desc: 'Firebase サーバーレス構成の提案・採用で月額10円以下の運用を実現' },
  { year: '2022.11 – 2023.04', name: '車リースWEBシステム', desc: '既存コードのロジック改善により検索速度を約50%向上' },
  { year: '2023.04 – 2023.07', name: 'Headless CMS POC', desc: 'GitHub Actions CI/CDパイプライン構築・アーキテクチャ設計から実装まで担当' },
  { year: '2023.07 – 2023.09', name: '類似品検索システム', desc: 'テーブル定義から動的にUIを生成する仕組みで200以上のテーブルに対応' },
  { year: '2023.09 – 2024.04', name: 'RAG開発', desc: 'フロントエンド・バックエンド両方のコードレビューと実装を担当' },
  { year: '2024.05', name: 'GPT検索アプリ POC', desc: '大手教育系企業のプロジェクトでユニットテスト・E2Eテストを実装' },
  { year: '2024.06 – 2025.03', name: 'クリニック検索・予約アプリ', desc: 'インフラ設計・CloudFrontキャッシュ戦略の最適化によるUX向上' },
  { year: '2025.04 – 2025.07', name: 'カーシェアシステム', desc: 'Stripe を用いた決済処理の設計・実装' },
  { year: '2025.08 – 2026.02', name: '基幹システム開発', desc: '詳細設計・実装・テスト設計/実施を担当' },
]

const certs = [
  { year: '2022.02', name: '日本語能力試験 JLPT N1' },
  { year: '2024.05', name: 'AWS Certified Solutions Architect – Associate' },
  { year: '2024.12', name: 'AWS Certified Developer – Associate' },
]

// 레이아웃: 왼쪽 레이블 + 오른쪽 콘텐츠 2컬럼
function Section({ id, label, children }: { id?: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-stone-100 my-5 px-2">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 sm:gap-20">
        <FadeIn>
          <p className="text-xs font-mono tracking-widest text-stone-400 uppercase pt-1">{label}</p>
        </FadeIn>
        <div>{children}</div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
          <span className="text-sm font-medium text-stone-700 font-mono tracking-tight">ywl0806</span>
          <div className="hidden sm:flex gap-8">
            {['About', 'Skills', 'Projects', 'Career', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-stone-400 hover:text-stone-800 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — full viewport height, vertically centered */}
      <div style={{ minHeight: 'calc(100vh - 64px)', marginTop: '64px' }} className="flex items-center">
        <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 py-12 sm:py-16">
          <p className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-8">Full Stack Engineer</p>
          <h1 className="text-5xl sm:text-7xl font-light tracking-tight text-stone-900 leading-[1.1] mb-4">
            イ・ヨンウ
          </h1>
          <p className="text-xl sm:text-2xl text-stone-300 font-light mb-10">Lee Yong-woo</p>
          <p className="text-base sm:text-lg text-stone-500 max-w-xl leading-relaxed mb-12">
            設計から実装・運用まで、
            <br />プロダクトを一貫して作るエンジニア
          </p>
          <div className="flex gap-3">
            <a
              href="https://github.com/ywl0806"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-stone-600 border border-stone-200 bg-white rounded-full px-6 py-2.5 hover:border-stone-400 hover:text-stone-900 transition-all duration-200"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="mailto:ywl0806@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-stone-600 border border-stone-200 bg-white rounded-full px-6 py-2.5 hover:border-stone-400 hover:text-stone-900 transition-all duration-200"
            >
              <MailIcon />
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <Section id="about" label="About">
        <FadeIn delay={1}>
          <p className="text-stone-600 text-lg leading-[1.9]">
            バックエンド・インフラ領域を中心に、
            フロントエンドまで含めたプロダクト開発に従事。
            Go / Python / AWS を軸に、
            設計・実装・運用まで一貫して対応しています。
            個人開発では顔認識フォトプラットフォームを開発し、
            非同期処理・ベクトル検索・AWS を用いたインフラ構築など、
            実運用を意識した設計・開発に取り組んでいます。
          </p>
        </FadeIn>
      </Section>

      {/* Skills */}
      <Section id="skills" label="Skills">
        <div className="space-y-7">
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-start">
                <span className="text-xs text-stone-400 font-mono sm:w-24 sm:shrink-0 sm:pt-1.5">{category}</span>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className="text-sm text-stone-600 bg-stone-100 rounded-full px-4 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" label="Projects">
        <div className="space-y-6">
          {/* YUNO — with architecture diagram */}
          <FadeIn delay={1}>
            <div className="border border-stone-100 rounded-2xl p-8 bg-white hover:shadow-sm hover:border-stone-200 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg">YUNO</h3>
                  <p className="text-xs text-stone-400 font-mono mt-1">2024.02 –</p>
                </div>
                <a href="https://github.com/ywl0806/yuno_kiroku" target="_blank" rel="noopener noreferrer"
                  className="text-stone-300 hover:text-stone-600 transition-colors shrink-0 mt-1" aria-label="GitHub">
                  <GitHubIcon size={18} />
                </a>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                家族の写真・動画を共有し、AIによる顔認識で人物ごとに検索できるプライベートフォトプラットフォーム。Go + TypeScript + Python + AWS をフルスタックで個人開発。
              </p>
              {/* Screenshots */}
              <YunoScreenshots />
              {/* Diagram Tabs */}
              <YunoDiagramTabs />
              <div className="flex flex-wrap gap-2">
                {['Go', 'React', 'Python', 'Echo', 'PostgreSQL', 'pgvector', 'AWS', 'Terraform'].map(t => (
                  <span key={t} className="text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          </FadeIn>
          {/* mpm */}
          <FadeIn delay={2}>
            <div className="border border-stone-100 rounded-2xl p-8 bg-white hover:shadow-sm hover:border-stone-200 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-stone-900 text-lg">mpm</h3>
                  <p className="text-xs text-stone-400 font-mono mt-1">2023.12</p>
                </div>
                <a href="https://github.com/ywl0806/mpm" target="_blank" rel="noopener noreferrer"
                  className="text-stone-300 hover:text-stone-600 transition-colors shrink-0 mt-1" aria-label="GitHub">
                  <GitHubIcon size={18} />
                </a>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed mb-5">
                IDEを開く際、一つのコマンドで任意のプロジェクトのIDEを起動できるCLIツール。ターミナルからの操作を大幅に効率化。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">Go</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Career */}
      <Section id="career" label="Career">
        <div>
          <FadeIn delay={1}>
            <div className="mb-10">
              <p className="text-base font-medium text-stone-800">アルサーガパートナーズ株式会社</p>
              <p className="text-sm text-stone-400 font-mono mt-1">2022.07 – 現在 · Full Stack Engineer</p>
            </div>
          </FadeIn>
          <div>
            {career.map((item, i) => (
              <FadeIn key={item.name} delay={Math.min(Math.floor(i / 3) + 1, 5) as 1 | 2 | 3 | 4 | 5}>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 py-3 border-b border-stone-50 last:border-0 group cursor-default">
                  <span className="text-xs text-stone-300 font-mono sm:w-36 sm:shrink-0 sm:pt-0.5 group-hover:text-stone-400 transition-colors">
                    {item.year}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-stone-700 group-hover:text-stone-900 transition-colors">{item.name}</p>
                    <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications */}
      <Section label="Certifications">
        <div className="space-y-6">
          {certs.map((c, i) => (
            <FadeIn key={c.name} delay={(i + 1) as 1 | 2 | 3}>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 sm:items-baseline">
                <span className="text-xs text-stone-300 font-mono sm:w-20 sm:shrink-0">{c.year}</span>
                <p className="text-sm text-stone-600">{c.name}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" label="Contact">
        <div>
          <FadeIn delay={1}>
            <p className="text-stone-500 text-base mb-10 leading-relaxed">
              お仕事のご依頼・ご相談はお気軽にどうぞ。
            </p>
          </FadeIn>
          <div className="flex gap-4 flex-wrap">
            <FadeIn delay={2}>
              <a
                href="mailto:ywl0806@gmail.com"
                className="inline-flex items-center gap-2.5 text-sm text-stone-700 border border-stone-200 bg-white rounded-full px-6 py-3 hover:border-stone-400 hover:bg-stone-50 transition-all duration-200"
              >
                <MailIcon />
                ywl0806@gmail.com
              </a>
            </FadeIn>
            <FadeIn delay={3}>
              <a
                href="https://github.com/ywl0806"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-stone-700 border border-stone-200 bg-white rounded-full px-6 py-3 hover:border-stone-400 hover:bg-stone-50 transition-all duration-200"
              >
                <GitHubIcon />
                github.com/ywl0806
              </a>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10">
          <p className="text-xs text-stone-300 font-mono">© 2026 イ・ヨンウ</p>
        </div>
      </footer>
    </div>
  )
}

const ARCH_CHART = `
graph TB
    Client["React SPA (PWA)"]

    Client --> CF["CloudFront (CDN)"]
    Client --> APIGW["API Gateway"]

    APIGW --> Lambda-API["Lambda\nAPI Server (Go/Echo)"]
    CF --> S3Front["S3\n静的配信 (Frontend)"]

    Lambda-API --> PostgreSQL["PostgreSQL 17 + pgvector"]
    Lambda-API --> SQS
    Lambda-R -->
    SQS --> PyWorker["ECS Worker (Python)\n顔認識バッチ"]
    SQS --> GoWorker["ECS Worker (Go)\n動画処理バッチ"]

    Client -- "Presigned URL" --> S3Media["S3\nメディアストレージ"]
    S3Media -- "S3イベント" --> SQS
    SQS --> Lambda-R["Lambda\n画像リサイズ"]
`

const UPLOAD_CHART = `
sequenceDiagram
    participant C as 클라이언트
    participant API as API Server
    participant S3 as S3
    participant SQS_R as SQS (resize)
    participant RW as resize-worker
    participant SQS as SQS (face-recognition)
    participant AI as ai-batch (Python)
    participant FRW as face-recognition-worker (Go)
    participant DB as PostgreSQL

    C->>API: POST /presigned-url
    API->>DB: INSERT media_items(status=01) + media_files
    API->>S3: Presigned PUT URL 생성
    API-->>C: {media_item_id, presigned_url}

    C->>S3: PUT (직접 업로드)
    S3-->>C: 200 OK
    S3->>SQS_R: PutObject 이벤트 알림 (prefix=original/)

    SQS_R-->>RW: ReceiveMessage (Long Polling)
    RW->>DB: status=02
    RW->>S3: 원본 다운로드
    RW->>RW: EXIF 파싱
    RW->>S3: view / thumbnail 업로드
    RW->>DB: media_files INSERT, status=03 (조회 가능)
    RW->>SQS_R: DeleteMessage
    RW->>SQS: SendMessage {media_item_id, family_id, view_storage_key}

    SQS-->>AI: ReceiveMessage
    AI->>S3: view 이미지 다운로드
    AI->>AI: InsightFace 추론 → faces [{bbox, embedding}]
    AI->>FRW: subprocess stdin JSON

    FRW->>DB: advisory lock 획득
    FRW->>DB: pgvector 코사인 유사도 검색
    FRW->>DB: identity upsert + face_detections INSERT
    FRW->>S3: 얼굴 크롭 업로드 (512×512 WebP)
    FRW->>DB: identity_face_imgs INSERT

    C->>API: GET /upload-batch/status (폴링)
    API-->>C: {is_completed: true}
    `

const INFRA_CHART = `
graph TB
    TF["🏗 Terraform\n(IaC)"]

    subgraph Edge["Edge Layer"]
        CF_F["CloudFront\n(Frontend)"]
        CF_M["CloudFront\n(Media OAC)"]
        APIGW["API Gateway\nHTTP API"]
    end

    subgraph Lambda["Lambda Functions"]
        L_API["Lambda\nAPI Server\n(Go + Echo)"]
        L_R["Resize Worker\nGo + govips"]
    end

    subgraph ECS["ECS Fargate Spot"]
        ECS_A["AI Batch\nPython + InsightFace\n+ ArcFace"]
        ECS_V["Video Worker\nGo + ffmpeg"]
    end

    subgraph Queues["SQS"]
        SQS_R["resize-worker\nQueue"]
        SQS_F["face-recognition\nQueue"]
        SQS_V["video-processing\nQueue"]
    end

    subgraph Storage["Storage"]
        S3_WEB["S3\nyuno-frontend"]
        S3_MEDIA["S3\nyuno-media-bucket"]
        ECR["ECR\nDocker Images"]
    end

    subgraph DB["Database (External)"]
        SUPA["Supabase\nPostgreSQL 17\n+ pgvector"]
    end

    TF -.->|manages| Edge
    TF -.->|manages| Lambda
    TF -.->|manages| ECS
    TF -.->|manages| Queues
    TF -.->|manages| Storage

    CF_F --> S3_WEB
    CF_M --> S3_MEDIA
    APIGW --> L_API
    L_API --> SUPA
    L_API --> S3_MEDIA

    S3_MEDIA -->|Webhook| L_R
    L_R --> S3_MEDIA
    L_R --> SUPA
    L_R --> SQS_F
    L_R --> SQS_V

    SQS_F --> ECS_A
    ECS_A --> S3_MEDIA
    ECS_A --> SUPA

    SQS_V --> ECS_V
    ECS_V --> S3_MEDIA
    ECS_V --> SUPA

    ECR -.->|image| L_R
    ECR -.->|image| ECS_A
    ECR -.->|image| ECS_V
`

const yunoScreenshots = [
  '/imgs/img1.jpeg',
  '/imgs/img2.jpeg',
  '/imgs/img3.jpeg',
  '/imgs/img4.jpeg',
  '/imgs/img5.jpeg',
  '/imgs/img6.jpeg',
  '/imgs/img7.jpeg',
]

function YunoScreenshots() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {yunoScreenshots.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`YUNO screenshot ${i + 1}`}
          className="h-112 w-auto shrink-0 rounded-lg border border-stone-100 object-cover"
        />
      ))}
    </div>
  )
}

function YunoDiagramTabs() {
  const tabs = [
    { id: 'arch', label: '全体構成', chart: ARCH_CHART },
    { id: 'infra', label: 'インフラ構成', chart: INFRA_CHART },
    { id: 'upload', label: 'アップロード', chart: UPLOAD_CHART },
  ]
  const [active, setActive] = useState('arch')
  const current = tabs.find(t => t.id === active)!

  return (
    <div className="rounded-xl bg-stone-50 border border-stone-100 mb-6 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-stone-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2.5 text-xs font-mono tracking-wide transition-colors ${active === tab.id
              ? 'text-stone-700 border-b-2 border-stone-400 bg-white'
              : 'text-stone-400 hover:text-stone-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Diagram */}
      <div className="p-6">
        <MermaidDiagram key={active} chart={current.chart} />
      </div>
    </div>
  )
}


function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}
