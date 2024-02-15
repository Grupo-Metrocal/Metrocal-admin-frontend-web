interface ICodeGenerator {
  length: number
}

export const codeGenerator = ({ length }: ICodeGenerator): number => {
  const min = 1000
  const max = 9999

  const code = Math.floor(Math.random() * (max - min + 1)) + min

  // return code by length
  return Number(code.toString().slice(0, length))
}

export const passwordGenerator = ({ length }: ICodeGenerator): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return password
}
