"use client";

import { Modal } from "@/src/components/Modal";
import UserProfileForm from "@/src/features/auth/components/UserProfileForm";
import SaloonsSection from "@/src/features/saloons/components/SaallonsSecton";
import { useState } from "react";

export default function ProfilePage() {
  const [showSallonInfoModal, setShowSallonInfoModal] =
    useState<boolean>(false);
  return (
    <div className="max-w-md mx-auto items mt-6 px-4 space-y-8">
      <div>
        <h1 className="text-xl font-bold mb-4">Профиль</h1>
        <UserProfileForm />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowSallonInfoModal(true)}
        >
          Добавить салон
        </button>
        <Modal
          open={showSallonInfoModal}
          onClose={() => setShowSallonInfoModal(false)}
          title="Добавить салон"
        >
          <SaloonsSection />
        </Modal>
      </div>
    </div>
  );
}
