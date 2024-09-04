export default function createUrl(str: string): string {
   return `${import.meta.env.BASE_URL}assets/${str}.svg`;
}
