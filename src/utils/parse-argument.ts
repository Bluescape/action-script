export function parsedArgument(argumentsString: string, isJson: Boolean): any {
  try {
    return JSON.parse(argumentsString);
  } catch {
    if (isJson) {
      throw new Error(`Invalid json ${argumentsString}`);
    }
    return argumentsString;
  }
}
