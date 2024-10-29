type ErrorResponse = { error: string };

interface LocalTimeResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

export async function fetchLocalTime(): Promise<
  LocalTimeResponse | ErrorResponse
> {
  try {
    const response = await fetch(
      "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch local time.");
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    return error;
  }
}
