import { Result } from 'types';

declare var Noty: any;

export async function postData<T>(url: string, serializedData: string): Promise<Result<T>> {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: serializedData
    };

    const response = await fetch(url, options);

    return await response.json();

}


export async function getData<T>(url: string): Promise<Result<T>> {
    const response = await fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
    return await response.json();
}

export function showMessage(message: string) {
    const noty = new Noty({
        theme: 'metroui',
        type: "success",
        text: message,
        timeout: 2000
    });

    noty.show();
}

export function showError(errorMessage: string) {
    const noty = new Noty({
        theme: 'metroui',
        type: "error",
        text: errorMessage,
        timeout: 2000
    });

    noty.show();
}