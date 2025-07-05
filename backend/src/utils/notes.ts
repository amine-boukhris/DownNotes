export function fakeCheckGrammarAPI(text: string): string[] {
  // use an external api
  if (!text.endsWith(".")) return ["Note doesn't end with a period."];
  return [];
}
