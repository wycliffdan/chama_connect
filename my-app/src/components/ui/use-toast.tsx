"use client";

import * as React from "react";
import { ToastProvider, ToastViewport, useToast as useShadToast } from "./toast";

export function useToast() {
  return useShadToast();
}

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  );
}
