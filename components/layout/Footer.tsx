"use client";

import { DotField } from "./DotField";

export function Footer() {
  return (
    <footer className="relative flex h-screen w-full flex-col overflow-hidden bg-footer text-white">
      <div className="relative flex-1 border-b border-white/15">
        <DotField />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-6 py-12 text-[14px] uppercase tracking-[0.16em] md:grid-cols-4 md:px-[60px]">
        <FooterCol num="[02]" title="Телеграм">
          <a
            href="https://t.me/saymonsayzzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
            data-cursor="link"
          >
            @saymonsayzzz
          </a>
        </FooterCol>

        <FooterCol num="[03]" title="Телефон">
          <a
            href="tel:+79625800080"
            className="hover:text-accent"
            data-cursor="link"
          >
            +7 (962) 580-00-80
          </a>
        </FooterCol>

        <FooterCol num="[04]" title="Резюме">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Скачать CV ↗
          </a>
        </FooterCol>

        <FooterCol num="[05]" title="HH.ru">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Открыть профиль ↗
          </a>
        </FooterCol>
      </div>

    </footer>
  );
}

function FooterCol({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-muted-2">{num}</span>
      <span className="text-muted-2">{title}</span>
      <span className="text-[16px] normal-case tracking-normal text-white">
        {children}
      </span>
    </div>
  );
}
