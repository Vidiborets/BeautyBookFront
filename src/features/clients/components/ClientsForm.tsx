"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/src/components/Button";
import type { ClientFormValues } from "../types/index";

const Schema = Yup.object({
  name: Yup.string().trim().required("Укажите имя клиента"),
  phone: Yup.string().trim(),
  note: Yup.string().trim(),
});

const defaults: ClientFormValues = { name: "", phone: "", note: "" };

export function ClientForm({
  initialValues,
  submitLabel = "Сохранить",
  onSubmit,
}: {
  initialValues?: Partial<ClientFormValues>;
  submitLabel?: string;
  onSubmit: (values: ClientFormValues) => Promise<void> | void;
}) {
  const merged: ClientFormValues = { ...defaults, ...initialValues };

  return (
    <Formik
      initialValues={merged}
      enableReinitialize
      validationSchema={Schema}
      onSubmit={async (values, helpers) => {
        try {
          await onSubmit(values);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Имя</label>
            <Field
              name="name"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Телефон</label>
            <Field
              name="phone"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Комментарий</label>
            <Field
              as="textarea"
              name="note"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm min-h-20"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем..." : submitLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
