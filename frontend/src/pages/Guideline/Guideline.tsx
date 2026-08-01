import { TypographySection } from './sections/TypographySection'
import { BrandSection } from './sections/BrandSection'
import { Typography } from "@/shared/ui/Typography"
import { BadgeSection } from "./sections/BadgeSection"
import { AvatarSection } from "./sections/AvatarSection";
import { ButtonSection } from "./sections/ButtonSection";
import { CardSection } from "./sections/CardSection";

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
          Компоненты и дизайн-система приложения телефонного справочника
        </Typography>
      </header>

      <TypographySection/>
      <BrandSection/>
      <BadgeSection/>
      <AvatarSection/>
      <ButtonSection/>
      <CardSection/>
    </main>
  )
}
