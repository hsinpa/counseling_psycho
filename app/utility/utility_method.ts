import { FetcherWithComponents } from "@remix-run/react";

export let clamp = function(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
};

export function format_string(string: string, params: any[]) {
    return string.replace(/{(\d|\w+)}/g, (match, index) => {
        return typeof params[index] !== 'undefined' ? params[index] : match;
    });
}

export function sleep(timestamp: number){ 
    return new Promise(r => setTimeout(r, timestamp));
}

export function remix_uni_fetch(button: EventTarget & HTMLButtonElement, fetcher: FetcherWithComponents<unknown>, data: any) {
    button.disabled = true; 
    try {
        fetcher.formAction = location.href;
        fetcher.submit(
            data,
            {
              method: "POST",
              encType: "application/json",
            }
          );
    } catch{
        button.disabled = false;
        return;   
    }
}