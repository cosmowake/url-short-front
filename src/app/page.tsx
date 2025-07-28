"use client";
import { usePostSaveUrlMutation } from "@/api/urlApiSlice";
import { BASE_API_URL } from "@/utils/env";
import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("https://");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const [saveUrl, { isLoading }] = usePostSaveUrlMutation();

  const handleSave = async (url: string) => {
    try {
      const { data } = await saveUrl({ url });

      if (data?.status === "Error" && data.error) {
        setError(data.error);
        setTimeout(() => setError(""), 4000);
      }

      if (data?.status === "OK" && data.alias) {
        setShortUrl(`${BASE_API_URL}/redirect/${data.alias}`);
      }
    } catch (e: unknown) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
        <div className="loading loading-dots"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="join">
        <div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </g>
            </svg>
            <input
              type="url"
              required
              placeholder="https://"
              value={longUrl}
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              title="Must be valid URL"
              onChange={(e) => setLongUrl(e.currentTarget.value)}
            />
          </label>
          <p className="validator-hint">Must be valid URL</p>
        </div>
        <button
          className="btn btn-neutral join-item"
          onClick={() => handleSave(longUrl)}
        >
          Save
        </button>
      </div>

      {shortUrl && (
        <div className="text-[20px]">
          Your short url:{" "}
          <a className="text-blue-600" href={shortUrl} target="_blank">
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
