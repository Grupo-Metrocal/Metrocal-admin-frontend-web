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
