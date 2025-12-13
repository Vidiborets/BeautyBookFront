"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authStore } from "../stores/auth.stores";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/Button";

const SignUpSchema = Yup.object({
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
});

type SignUpFormProps = {
  initialEmail?: string;
};

export function SignUpForm({ initialEmail }: SignUpFormProps) {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: initialEmail ?? "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      enableReinitialize
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null);
        try {
          // 1. Создаём пользователя
          await authStore.register(values);

          // 2. Сразу логиним теми же данными
          await authStore.login(values.email, values.password);

          // 3. Отправляем на домашку
          router.push("/home");
        } catch (e) {
          setStatus("Ошибка регистрации");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, values }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Пароль</label>
            <Field
              name="password"
              type="password"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Имя</label>
              <Field
                name="firstName"
                className="w-full rounded-lg border border-input px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Фамилия</label>
              <Field
                name="lastName"
                className="w-full rounded-lg border border-input px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Телефон</label>
            <Field
              name="phoneNumber"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
          </div>

          {status && <div className="text-sm text-red-500">{status}</div>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Создаём..." : "Зарегистрироваться"}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-3">
            <span>Уже есть аккаунт? </span>
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() =>
                router.push(
                  `/login${
                    values.email
                      ? `?email=${encodeURIComponent(values.email)}`
                      : ""
                  }`,
                )
              }
            >
              Войти
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
