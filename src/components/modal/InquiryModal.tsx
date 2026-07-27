"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/context/LanguageProvider";
import { useModal } from "@/context/ModalProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { fieldClass, labelClass } from "@/components/ui/field";
import { submitInquiry } from "@/lib/inquiry";

type Status = "idle" | "sending" | "success" | "error";

export function InquiryModal() {
  const { t } = useLanguage();
  const { isOpen, closeModal } = useModal();
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock body scroll, close on Escape, focus first field while open.
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, closeModal]);

  // Reset the success state after the modal fully closes.
  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => setStatus("idle"), 300);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await submitInquiry("modal", {
        name: String(data.get("name") ?? ""),
        brand: String(data.get("brand") ?? ""),
        city: String(data.get("city") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label={t.modal.title}
        >
          <motion.div
            className="absolute inset-0 cursor-pointer bg-inverse-surface/60 backdrop-blur-md"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <div className="absolute inset-0 flex items-center justify-center overflow-y-auto p-margin">
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-headline-lg text-on-surface">
                    {t.modal.title}
                  </h2>
                  <button
                    onClick={closeModal}
                    aria-label="Close"
                    className="text-on-surface-variant transition-colors hover:text-primary"
                  >
                    <Icon name="close" />
                  </button>
                </div>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <Icon
                      name="task_alt"
                      size={56}
                      className="text-tertiary"
                      filled
                    />
                    <p className="text-body-lg text-on-surface">
                      {t.modal.success}
                    </p>
                    <Button onClick={closeModal} variant="subtle">
                      {t.modal.title}
                    </Button>
                  </motion.div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className={labelClass}>{t.modal.name}</label>
                      <input
                        ref={firstFieldRef}
                        type="text"
                        name="name"
                        required
                        className={fieldClass}
                        placeholder={t.modal.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>{t.modal.brand}</label>
                      <input
                        type="text"
                        name="brand"
                        className={fieldClass}
                        placeholder={t.modal.brandPlaceholder}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{t.modal.city}</label>
                        <input
                          type="text"
                          name="city"
                          className={fieldClass}
                          placeholder={t.modal.cityPlaceholder}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>{t.modal.phone}</label>
                        <input
                          type="tel"
                          name="phone"
                          className={fieldClass}
                          placeholder={t.modal.phonePlaceholder}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>{t.modal.message}</label>
                      <textarea
                        rows={4}
                        name="message"
                        className={fieldClass}
                        placeholder={t.modal.messagePlaceholder}
                      />
                    </div>
                    <div className="hidden" aria-hidden="true">
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    {status === "error" && (
                      <p role="alert" className="text-body-md text-error">
                        {t.modal.error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      className="mt-4"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? t.modal.sending : t.modal.submit}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
