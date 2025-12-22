"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
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
import { servicesStore } from "../../services/store/service.stores";
import { cn } from "@/lib/utils";

export type AppointmentFormValues = {
  serviceName: string;
  clientName: string;
  price: string | number;
  date: string;
  time: string;
  durationMin: number;
  description?: string;
};

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

const defaultValues: AppointmentFormValues = {
  serviceName: "",
  clientName: "",
  price: "",
  date: "",
  time: "",
  durationMin: 60,
  description: "",
};

export function AppointmentForm({
  initialValues,
  onSubmit,
  submitLabel = "Сохранить",
}: {
  initialValues?: Partial<AppointmentFormValues>;
  onSubmit?: (values: AppointmentFormValues) => Promise<void>;
  submitLabel?: string;
}) {
  const merged = { ...defaultValues, ...initialValues };
  const { isLoading: servicesLoading } = useServices();
  const services = servicesStore.items;
  console.log("services", services);

  return (
    <Formik
      initialValues={merged}
      enableReinitialize
      validationSchema={AppointmentSchema}
      onSubmit={async (values, helpers) => {
        helpers.setStatus(null);
        try {
          if (onSubmit) {
            await onSubmit(values);
          }
          helpers.setStatus("Успешно");
        } catch {
          helpers.setStatus("Ошибка");
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, setFieldValue, values }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Услуга</label>

            <Select
              value={values.serviceName}
              onValueChange={(val) => {
                setFieldValue("serviceName", val);

                const selected = services.find((s) => String(s.id) === val);
                if (selected) {
                  setFieldValue("price", String(selected.price));
                  setFieldValue("durationMin", selected.duration);
                }
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
            <Field
              name="clientName"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="clientName"
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
            <label className="block text-sm mb-1">Длительность (мин)</label>
            <Field
              type="number"
              name="durationMin"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
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
      )}
    </Formik>
  );
}
