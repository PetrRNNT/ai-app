<template>
  <div class="confirm-overlay" @click="$emit('cancel')">
    <div class="confirm-modal" @click.stop>
      <div class="confirm-icon">
        <span v-if="type === 'danger'">⚠️</span>
        <span v-else-if="type === 'info'">ℹ️</span>
        <span v-else>❓</span>
      </div>

      <h3 class="confirm-title">{{ title }}</h3>
      <p class="confirm-message">{{ message }}</p>

      <div class="confirm-actions">
        <button
          type="button"
          @click="$emit('cancel')"
          class="btn-cancel"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          @click="$emit('confirm')"
          class="btn-confirm"
          :class="`btn-confirm-${type}`"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
  type?: 'danger' | 'info' | 'warning'
  confirmText?: string
  cancelText?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.confirm-modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.confirm-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
}

.confirm-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 12px;
}

.confirm-message {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancel {
  flex: 1;
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.btn-confirm {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm-danger {
  background: #dc2626;
}

.btn-confirm-danger:hover {
  background: #b91c1c;
}

.btn-confirm-warning {
  background: #f59e0b;
}

.btn-confirm-warning:hover {
  background: #d97706;
}

.btn-confirm-info {
  background: #3b82f6;
}

.btn-confirm-info:hover {
  background: #2563eb;
}
</style>
