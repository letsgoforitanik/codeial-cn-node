export default function parseFlashErrors(errors: string[]) {

    const flashErrors: FlashError[] = [];

    for (const error of errors) {
        const delimIndex = error.indexOf("|");
        const path = error.substring(0, delimIndex);
        const message = error.substring(delimIndex + 1);
        flashErrors.push({ path, message });
    }

    return flashErrors;

}