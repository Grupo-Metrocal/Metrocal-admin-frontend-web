interface ICodeGenerator {
  suffix?: string
  length: number
}

export const passwordResetCodeGenerator = ({
  suffix,
  length,
}: ICodeGenerator) => {
  const min = 1000
  const max = 9999

  const code = Math.floor(Math.random() * (max - min + 1)) + min
  const lenghtCode = code.toString().padStart(length, '0')

  return suffix ? `${suffix}_${lenghtCode}` : lenghtCode
}
