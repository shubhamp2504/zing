/**
 * ⚡ ZingLensCamera — Camera-based concept scanner
 *
 * Mobile-only. Uses getUserMedia API to capture images,
 * sends to Gemini Vision for concept identification.
 */
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface LensResult {
  concept: string | null;
  universe?: string;
  zingPath?: string;
  explanation: string;
  confidence: number;
  examRelevance?: string[];
}

export function ZingLensCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<LensResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  }, []);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setStream(mediaStream);
      setIsCapturing(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch {
      setError('Camera access denied. Please allow camera access.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setIsCapturing(false);
  }, [stream]);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    // Convert to base64
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    const base64 = dataUrl.split(',')[1];

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch('/api/zing-lens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType: 'image/jpeg' }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data: LensResult = await response.json();
      setResult(data);
      stopCamera();
    } catch {
      setError('Analysis failed. Try again with a clearer image.');
    } finally {
      setIsProcessing(false);
    }
  }, [stopCamera]);

  // Desktop: show "open on mobile" message
  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-8">
        <div className="text-6xl mb-4">📱</div>
        <h2 className="text-2xl font-bold text-white mb-2">ZING Lens is Mobile-Only</h2>
        <p className="text-white/60 max-w-md">
          Open ZING on your phone to scan textbooks, diagrams, monuments — anything educational.
          Point your camera and let AI identify the concept!
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col">
      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera View */}
      {isCapturing && (
        <div className="relative flex-1">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-2xl"
            playsInline
            muted
          />

          {/* Scanning overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-64 h-64 border-2 border-white/40 rounded-2xl"
              style={{
                boxShadow: isProcessing ? '0 0 40px rgba(255, 215, 0, 0.3)' : 'none',
              }}
            />
          </div>

          {/* Processing indicator */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <div className="text-4xl animate-pulse mb-2">🔍</div>
                <p className="text-white/80">Analyzing...</p>
              </div>
            </div>
          )}

          {/* Capture button */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={captureAndAnalyze}
              disabled={isProcessing}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center disabled:opacity-50"
            >
              <span className="text-2xl">⚡</span>
            </button>
            <button
              onClick={stopCamera}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Start Camera */}
      {!isCapturing && !result && (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="text-6xl mb-6">📷</div>
          <h2 className="text-2xl font-bold text-white mb-2">ZING Lens</h2>
          <p className="text-white/60 text-center mb-8 max-w-sm">
            Point your camera at a textbook, diagram, monument, or map.
            AI will identify the concept and find the ZING topic!
          </p>
          <button
            onClick={startCamera}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black shadow-lg"
          >
            Open Camera
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="flex-1 flex flex-col px-4 py-8">
          {result.concept ? (
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚡</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{result.concept}</h3>
                  <p className="text-sm text-white/50">{result.universe}</p>
                </div>
                <span
                  className="ml-auto px-2 py-1 rounded text-xs font-mono"
                  style={{
                    backgroundColor:
                      result.confidence > 0.8
                        ? 'rgba(34,197,94,0.2)'
                        : result.confidence > 0.5
                          ? 'rgba(234,179,8,0.2)'
                          : 'rgba(239,68,68,0.2)',
                    color:
                      result.confidence > 0.8
                        ? '#22c55e'
                        : result.confidence > 0.5
                          ? '#eab308'
                          : '#ef4444',
                  }}
                >
                  {Math.round(result.confidence * 100)}%
                </span>
              </div>

              <p className="text-white/70 mb-4">{result.explanation}</p>

              {result.examRelevance && result.examRelevance.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {result.examRelevance.map((exam) => (
                    <span
                      key={exam}
                      className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-xs"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              )}

              {result.zingPath && (
                <a
                  href={result.zingPath}
                  className="block w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold text-black text-center"
                >
                  Open on ZING →
                </a>
              )}

              <button
                onClick={() => {
                  setResult(null);
                  startCamera();
                }}
                className="mt-3 w-full py-2 bg-white/5 rounded-xl text-white/60 text-sm"
              >
                Scan Again
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🤔</div>
              <p className="text-white/60">{result.explanation}</p>
              <button
                onClick={() => {
                  setResult(null);
                  startCamera();
                }}
                className="mt-6 px-6 py-2 bg-white/10 rounded-full text-white/80"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
