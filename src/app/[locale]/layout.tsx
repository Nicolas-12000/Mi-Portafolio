import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { Navigation, Footer } from '@/components/layout';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
    
  const { locale } = await params;

  // Validar locale
  if (!locales.includes(locale as 'es' | 'en' | 'it')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0a14]/30 via-[#F5F1E8]/80 to-[#F5F1E8] dark:from-background/50 dark:via-background/95 dark:to-background">
        <Navigation locale={locale as Locale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}