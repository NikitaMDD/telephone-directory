import { TypographySection } from './sections/TypographySection'
import { BrandSection } from './sections/BrandSection'
import { Typography } from "@/shared/ui/Typography"

export function Guideline() {
  return (
    <main className='mx-auto max-w-7xl p-12'>

      <header className='mb-16'>
        <Typography variant="display">
          Телефонный справочник UI Kit
        </Typography>

        <Typography
          variant='body'
          className="mt-4 text-[var(--color-text-secondary)]"
        >
          Компоненты и дизайн-система приложения учета личных финансов
        </Typography>
      </header>

      <TypographySection/>
      <BrandSection/>
    </main>
  )
}
