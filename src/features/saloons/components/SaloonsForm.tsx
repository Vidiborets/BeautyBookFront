// features/saloons/components/SaloonsForm.tsx
"use client";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { Saloon, SaloonFormValues } from "../types";
import { Button } from "@/src/components/Button";

const SaloonSchema = Yup.object({
  name: Yup.string().required("Укажи название салона"),
  address: Yup.string().required("Укажи адрес"),
  phone: Yup.string().optional(),
  employees: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Имя обязательно"),
      role: Yup.string().optional(),
      phone: Yup.string().optional(),
      schedule: Yup.string().optional(),
    }),
  ),
});

type Props = {
  initial?: Saloon;
  onSubmit: (values: SaloonFormValues) => Promise<void>;
  submitLabel: string;
};

export function SaloonForm({ initial, onSubmit, submitLabel }: Props) {
  const initialValues: SaloonFormValues = {
    name: initial?.name ?? "",
    address: initial?.address ?? "",
    phone: initial?.phone ?? "",
    employees: initial?.employees?.length
      ? initial.employees.map((e) => ({
          name: e.name,
          role: e.role ?? "",
          phone: e.phone ?? "",
          schedule: e.schedule ?? "",
        }))
      : [
          {
            name: "",
            role: "",
            phone: "",
            schedule: "",
          },
        ],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SaloonSchema}
      onSubmit={async (values, helpers) => {
        helpers.setStatus(null);
        try {
          await onSubmit(values);
          helpers.setStatus("Сохранено ✅");
        } catch {
          helpers.setStatus("Ошибка сохранения");
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, status }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Название салона</label>
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
            <label className="block text-sm mb-1">Адрес</label>
            <Field
              name="address"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Телефон салона</label>
            <Field
              name="phone"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
          </div>

          {/* Сотрудники */}
          <FieldArray name="employees">
            {({ push, remove }) => (
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-col">
                  <span className="text-sm font-medium mb-2">Сотрудники</span>
                  <Button
                    type="button"
                    onClick={() =>
                      push({ name: "", role: "", phone: "", schedule: "" })
                    }
                  >
                    + Добавить сотрудника
                  </Button>
                </div>

                {values.employees.map((emp, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-muted/40 p-3 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Сотрудник {index + 1}
                      </span>
                      {values.employees.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-xs text-red-500"
                        >
                          Удалить
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs mb-1">Имя</label>
                      <Field
                        name={`employees[${index}].name`}
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                      />
                      <ErrorMessage
                        name={`employees[${index}].name`}
                        component="div"
                        className="text-xs text-red-500 mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1">Роль</label>
                      <Field
                        name={`employees[${index}].role`}
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1">
                        Телефон сотрудника
                      </label>
                      <Field
                        name={`employees[${index}].phone`}
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-1">
                        График работы
                      </label>
                      <Field
                        name={`employees[${index}].schedule`}
                        placeholder="Например: Пн–Пт 10:00–20:00"
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          {status && (
            <div className="text-xs text-muted-foreground">{status}</div>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем..." : submitLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
