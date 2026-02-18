import { g as defineNuxtRouteMiddleware, b as useAuthStore } from './server.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const auth = defineNuxtRouteMiddleware((to) => {
  useAuthStore();
  {
    return;
  }
});

export { auth as default };
//# sourceMappingURL=auth-DeZhaGgk.mjs.map
