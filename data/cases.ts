export type CaseSection =
  | {
      type: "two-column";
      left: { title: string; body: string };
      right: { title: string; body: string };
    }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "text"; title?: string; paragraphs: string[] };

export type CaseSlug = "karuna" | "aff" | "no-code-ds" | "shred";

export type Case = {
  slug: CaseSlug;
  title: string;
  tagline: string;
  intro: string;
  preview: {
    variant: "wide" | "half";
    tags: string[];
    description: string;
    media: PreviewMedia;
  };
  sections: CaseSection[];
};

export type PreviewMedia =
  | { kind: "placeholder" }
  | { kind: "phones-trio" }
  | { kind: "phone-single"; src: string }
  | { kind: "laptop"; src: string };

export const cases: Case[] = [
  {
    slug: "karuna",
    title: "KARUNA",
    tagline: "Дизайн кассы для Финтеха",
    intro:
      "Karuna — глобальная платформа трейдинга. Я отвечал за дизайн внутренней кассы: пополнение и вывод средств, биллинг и финансовые отчёты партнёрам.",
    preview: {
      variant: "wide",
      tags: ["Worldwide Trading Platform", "Billing"],
      description: "Дизайн кассы для Финтеха",
      media: { kind: "placeholder" },
    },
    sections: [
      {
        type: "two-column",
        left: {
          title: "Подсветка Касса продукта",
          body: "Касса — ключевой продукт платформы. Обслуживает более 10 финтех-партнёров и обрабатывает миллионы транзакций в сутки.",
        },
        right: {
          title: "Результат",
          body: "Снижение конверсионных потерь на 18%, сокращение среднего времени поддержки оператора в 2 раза.",
        },
      },
      {
        type: "text",
        title: "Проблема",
        paragraphs: [
          "Накопилось значительное количество разрозненных решений и легаси-интерфейсов.",
          "Не покрывался поток новых финтех-операций.",
          "Процесс согласования между продуктом, юристами и комплаенсом — непрозрачный.",
        ],
      },
      {
        type: "text",
        title: "Исследование",
        paragraphs: [
          "Провёл серию интервью с операторами и продуктовыми менеджерами на нескольких рынках.",
          "В итоге выделил каждый ключевой сценарий и собрал реальный JTBD — пользователь, мотивация, барьер.",
        ],
      },
    ],
  },
  {
    slug: "aff",
    title: "AFF",
    tagline: "Платформа для партнёров трейдинга",
    intro:
      "Партнёрский кабинет — точка входа в продукт для агентств и индивидуальных партнёров. Управление ссылками, отчётностью, выплатами.",
    preview: {
      variant: "half",
      tags: ["Partnership"],
      description: "Платформа для партнеров трейдинга",
      media: { kind: "phones-trio" },
    },
    sections: [
      {
        type: "text",
        title: "Контекст",
        paragraphs: [
          "Партнёры — отдельный сегмент аудитории со своими задачами и метриками. Им важно видеть отчётность по конверсиям и выплатам в один клик.",
        ],
      },
    ],
  },
  {
    slug: "no-code-ds",
    title: "NO-CODE DS",
    tagline: "Дизайн-система для лендингов без участия разработчиков",
    intro:
      "Дизайн-система на базе Webflow, которая позволила маркетингу запускать лендинги в одиночку — без бэклога фронтенда.",
    preview: {
      variant: "half",
      tags: ["Webflow", "Design system"],
      description: "Дизайн система для лендингов без участия разработчиков",
      media: { kind: "phone-single", src: "/cases/no-code-ds-phone.png" },
    },
    sections: [
      {
        type: "text",
        title: "Контекст",
        paragraphs: [
          "Маркетинг запускал по 3-5 лендингов в месяц. Каждый требовал недели разработки. Нужен был способ собирать страницы без ручного кода.",
        ],
      },
    ],
  },
  {
    slug: "shred",
    title: "SHRED",
    tagline: "CRM сервис для контроля качества обслуживания клиентов",
    intro:
      "Shred — внутренний CRM для контроля качества звонков и встреч. Аналитика, теги, оценки, отчётность.",
    preview: {
      variant: "wide",
      tags: ["Retail", "CRM"],
      description: "CRM сервис для контроля качества обслуживания клиентов",
      media: { kind: "laptop", src: "/cases/shred-laptop.png" },
    },
    sections: [
      {
        type: "text",
        title: "Контекст",
        paragraphs: [
          "Контакт-центру нужен был инструмент, который автоматически собирает фидбек по разговорам и связывает его с показателями менеджеров.",
        ],
      },
    ],
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
