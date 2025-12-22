"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export type ServicesFormValues = {
  name: string;
  price: string; // в грн для пользователя
  duration: number;
  description?: string;
};

const ServiceSchema = Yup.object({
  name: Yup.string().required("Укажите название услуги"),
  price: Yup.number()
    .typeError("Должно быть число")
    .min(0, "Не меньше 0")
    .required("Укажите цену"),
  duration: Yup.number()
    .typeError("Должно быть число")
    .min(5, "Минимум 5 минут")
    .required("Укажите длительность"),
  description: Yup.string().max(500, "Слишком длинное описание"),
});

const defaultValues: ServicesFormValues = {
  name: "",
  price: "",
  duration: 60,
  description: "",
};

export function ServicesForm({
  initial,
  submitLabel = "Сохранить",
  onSubmit,
}: {
  initial?: Partial<ServicesFormValues>;
  submitLabel?: string;
  onSubmit: (values: ServicesFormValues) => Promise<void>;
}) {
  const merged = { ...defaultValues, ...initial };

  return (
    <Formik
      initialValues={merged}
      enableReinitialize
      validationSchema={ServiceSchema}
      onSubmit={async (values, helpers) => {
        helpers.setStatus(null);
        try {
          await onSubmit(values);
          helpers.setStatus("Сохранено");
        } catch {
          helpers.setStatus("Ошибка сохранения");
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Название услуги</label>
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
            <label className="block text-sm mb-1">Цена (₴)</label>
            <Field
              name="price"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Длительность (мин)</label>
            <Field
              type="number"
              name="duration"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="duration"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Комментарий</label>
            <Field
              as="textarea"
              name="description"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm min-h-20"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          {status && (
            <div className="text-xs text-muted-foreground">{status}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-70"
          >
            {isSubmitting ? "Сохраняем..." : submitLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
}
export default ServicesForm;
