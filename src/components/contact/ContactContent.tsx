"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { contactBranches, contactChannels } from "@/lib/content";
import { useLanguage } from "@/context/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { fieldClass, labelClass } from "@/components/ui/field";
import { submitInquiry } from "@/lib/inquiry";

const CARD = "bento-card rounded-xl border border-outline-variant/40 p-8";

type Status = "idle" | "sending" | "success" | "error";

export function ContactContent() {
  const { t, pick } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      await submitInquiry("contact", {
        name: String(data.get("name") ?? ""),
        brand: String(data.get("brand") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? ""),
        branch: String(data.get("branch") ?? ""),
        message: String(data.get("message") ?? ""),
        website: String(data.get("website") ?? ""),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="px-margin py-16">
      <div className="mx-auto max-w-[1440px]">
        <PageHeader
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-gutter lg:grid-cols-[1fr_minmax(320px,400px)]">
          <Reveal>
            <div className={CARD}>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-16 text-center"
                >
                  <Icon name="task_alt" size={56} className="text-tertiary" filled />
                  <p className="text-body-lg text-on-surface">
                    {t.contact.form.success}
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        {t.contact.form.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-brand" className={labelClass}>
                        {t.contact.form.brand}
                      </label>
                      <input
                        id="contact-brand"
                        type="text"
                        name="brand"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className={labelClass}>
                        {t.contact.form.phone}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        {t.contact.form.email}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-branch" className={labelClass}>
                      {t.contact.form.branch}
                    </label>
                    <select id="contact-branch" name="branch" className={fieldClass}>
                      {contactBranches.map((branch) => (
                        <option key={pick(branch)}>{pick(branch)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      name="message"
                      className={fieldClass}
                    />
                  </div>
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                  {status === "error" && (
                    <p role="alert" className="text-body-md text-error">
                      {t.contact.form.error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-4"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className={CARD}>
              <ul className="space-y-6">
                {contactChannels.map((channel) => {
                  const label = t.contact.channels[channel.labelKey];
                  const value =
                    channel.value ??
                    (channel.labelKey === "hours"
                      ? t.contact.channels.hours
                      : t.contact.channels.location);
                  return (
                    <li key={channel.labelKey} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container">
                        <Icon name={channel.icon} size={20} className="text-primary" />
                      </span>
                      <div>
                        <div className="text-caption uppercase tracking-wider text-on-surface-variant">
                          {label}
                        </div>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            dir="ltr"
                            className="text-label-md text-on-surface transition-colors hover:text-secondary"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="text-label-md text-on-surface">{value}</div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
