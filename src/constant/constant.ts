export const TARGET_URL: string = process.env.REACT_APP_API_BASE_URL ?? "http://localhost:8080/"
export const VERSION: string = "v1/";
export const BASE_URL: string = `${TARGET_URL}${VERSION}`

export const PAGE_SIZE: number = 12;

export const RANKING_NUMBER: number = 12;

export const IMAGE_PREFIX: string = `${BASE_URL}image/images/`;