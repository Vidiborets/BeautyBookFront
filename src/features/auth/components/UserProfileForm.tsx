"use client";

import { observer } from "mobx-react-lite";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authStore } from "@/src/features/auth/stores/auth.stores";
import { Button } from "@/src/components/Button";

const ProfileSchema = Yup.object({
  firstName: Yup.string().max(50, "Слишком длинное имя"),
  lastName: Yup.string().max(50, "Слишком длинная фамилия"),
  phoneNumber: Yup.string().max(30, "Слишком длинный номер"),
});

const UserProfileForm = observer(() => {
  const user = authStore.user;

  if (!user) {
    return (
      <div className="text-sm text-muted-foreground">
        Не удалось загрузить профиль
      </div>
    );
  }

  const initialValues = {
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    phoneNumber: user.phoneNumber ?? "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={async (values, helpers) => {
        helpers.setStatus(null);
        try {
          await authStore.updateProfile(values);
          helpers.setStatus("Сохранено ✅");
        } catch {
          helpers.setStatus("Не удалось сохранить");
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Имя</label>
            <Field
              name="firstName"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Фамилия</label>
            <Field
              name="lastName"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Телефон</label>
            <Field
              name="phoneNumber"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          {status && (
            <div className="text-xs text-muted-foreground">{status}</div>
          )}

          <Button type="submit" disabled={isSubmitting || authStore.loading}>
            {isSubmitting || authStore.loading ? "Сохраняем..." : "Сохранить"}
          </Button>
        </Form>
      )}
    </Formik>
  );
});

export default UserProfileForm;
