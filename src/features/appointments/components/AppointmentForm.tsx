"use client";

import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { Button } from "@/src/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServices } from "../../services/hooks/useServices";
import { cn } from "@/lib/utils";
import { Client } from "../../clients/types";
import { ClientCombobox } from "../../clients/components/ClientsSelect";
import { AppointmentFormValuesType } from "../types/index";
import { Service } from "../../services/types";
import { clamp, toHM } from "../utils";

const AppointmentSchema = Yup.object({
  serviceName: Yup.string().required("Укажите услугу"),
  clientName: Yup.string().required("Укажите имя клиента"),
  price: Yup.number().typeError("Должно быть число").min(0, "Не меньше 0"),
  date: Yup.string().required("Дата обязательна"),
  time: Yup.string().required("Время обязательно"),
  durationMin: Yup.number()
    .typeError("Должно быть число")
    .min(15, "Минимум 15 минут"),
});

const defaultValues: AppointmentFormValuesType = {
  serviceName: "",
  serviceId: null,
  clientId: null,
  clientName: "",
  clientPhone: "",
  clientNote: "",
  price: "",
  date: "",
  time: "",
  durationMin: 60,
  durationHours: "1",
  durationMinutes: "0",
  description: "",
};

export function AppointmentForm({
  initialValues,
  onSubmit,
  submitLabel = "Сохранить",
}: {
  initialValues?: Partial<AppointmentFormValuesType>;
  onSubmit?: (values: AppointmentFormValuesType) => Promise<void>;
  submitLabel?: string;
}) {
  const merged = { ...defaultValues, ...initialValues };

  const { data: services = [], isLoading: servicesLoading } = useServices() as {
    data?: Service[];
    isLoading?: boolean;
  };

  return (
    <Formik
      initialValues={merged}
      enableReinitialize
      validationSchema={AppointmentSchema}
      onSubmit={async (values, helpers) => {
        helpers.setStatus(null);
        try {
          const h = clamp(Number(values.durationHours || 0), 0, 24);
          const m = clamp(Number(values.durationMinutes || 0), 0, 59);

          const normalized: AppointmentFormValuesType = {
            ...values,
            durationMin: h * 60 + m,
          };

          if (onSubmit) await onSubmit(normalized);

          helpers.setStatus("Успешно");
        } catch {
          helpers.setStatus("Ошибка");
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, setFieldValue, values }) => {
        const showClientDetails =
          values.clientId !== null || values.clientName.trim() !== "";

        return (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Услуга</label>

              <Select
                value={values.serviceId ? String(values.serviceId) : ""}
                onValueChange={(val) => {
                  const serviceId = Number(val);
                  const selected = services.find((s) => s.id === serviceId);
                  if (!selected) return;

                  const h = Math.floor(selected.duration / 60);
                  const m = selected.duration % 60;

                  setFieldValue("serviceId", serviceId);
                  setFieldValue("serviceName", selected.name);
                  setFieldValue("price", String(selected.price));
                  setFieldValue("durationMin", selected.duration);

                  setFieldValue("durationHours", String(h));
                  setFieldValue("durationMinutes", String(m));
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      servicesLoading ? "Загрузка..." : "Выберите услугу"
                    }
                  />
                </SelectTrigger>

                <SelectContent className={cn("z-[9999]")}>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ErrorMessage
                name="serviceName"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Клиент</label>

              <ClientCombobox
                valueClientId={values.clientId ?? null}
                onPickClient={(client: Client) => {
                  setFieldValue("clientId", client.id);
                  setFieldValue("clientName", client.name);
                  setFieldValue("clientPhone", client.phone ?? "");
                  setFieldValue("clientNote", client.note ?? "");
                }}
                onChangeClientName={(name) => setFieldValue("clientName", name)}
                placeholder="Выберите клиента"
              />

              <ErrorMessage
                name="clientName"
                component="div"
                className="text-xs text-red-500 mt-1"
              />
            </div>

            {showClientDetails && (
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm mb-1">Телефон</label>
                  <Field
                    name="clientPhone"
                    className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    Комментарий к клиенту
                  </label>
                  <Field
                    as="textarea"
                    name="clientNote"
                    className="w-full rounded-lg border border-input px-3 py-2 text-sm min-h-20"
                  />
                </div>
              </div>
            )}
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

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Дата</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-xs text-red-500 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Время</label>
                <Field
                  type="time"
                  name="time"
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-xs text-red-500 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Длительность</label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Часы</div>
                  <Field name="durationHours">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        inputMode="numeric"
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d]/g, "");
                          setFieldValue("durationHours", raw);

                          const h = clamp(Number(raw || 0), 0, 24);
                          const m = clamp(
                            Number(values.durationMinutes || 0),
                            0,
                            59,
                          );
                          setFieldValue("durationMin", h * 60 + m);
                        }}
                        onBlur={() => {
                          const h = clamp(
                            Number(values.durationHours || 0),
                            0,
                            24,
                          );
                          setFieldValue("durationHours", String(h));
                        }}
                      />
                    )}
                  </Field>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Минуты
                  </div>
                  <Field name="durationMinutes">
                    {({ field }: FieldProps) => (
                      <input
                        {...field}
                        inputMode="numeric"
                        className="w-full rounded-lg border border-input px-3 py-2 text-sm"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d]/g, "");
                          setFieldValue("durationMinutes", raw);

                          const h = clamp(
                            Number(values.durationHours || 0),
                            0,
                            24,
                          );
                          const m = clamp(Number(raw || 0), 0, 59);
                          setFieldValue("durationMin", h * 60 + m);
                        }}
                        onBlur={() => {
                          const m = clamp(
                            Number(values.durationMinutes || 0),
                            0,
                            59,
                          );
                          setFieldValue("durationMinutes", String(m));
                        }}
                      />
                    )}
                  </Field>
                </div>
              </div>

              <ErrorMessage
                name="durationMin"
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
            </div>

            {status && (
              <div className="text-xs text-muted-foreground">{status}</div>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Сохраняем..." : submitLabel}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
