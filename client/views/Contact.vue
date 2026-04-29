<script setup>
import PageHead from '../components/PageHead.vue';
import Panel from '../components/Panel.vue';
import Terminal from '../components/Terminal.vue';

const channels = [
  { icon: 'mail',         label: 'EMAIL',     handle: 'bajjy.xilo@gmail.com', href: 'mailto:bajjy.xilo@gmail.com' },
  { icon: 'code',         label: 'GITHUB',    handle: '@bajjy',               href: 'https://github.com/bajjy' },
  { icon: 'work',         label: 'LINKEDIN',  handle: 'in/bajjy',             href: 'https://www.linkedin.com/in/bajjy/' },
  { icon: 'photo_camera', label: 'INSTAGRAM', handle: '@bajjy.xilo',          href: 'https://www.instagram.com/bajjy.xilo/' },
  { icon: 'forum',        label: 'THREADS',   handle: '@bajjy.xilo',          href: 'https://www.threads.com/@bajjy.xilo' },
];
</script>

<template>
  <PageHead :meta="[
    { label: 'CHANNEL', value: 'OPEN' },
    { label: 'RESPONSE', value: 'ASYNC' },
  ]" />

  <Panel title="MESSAGE_PROTOCOL" hint="HOW_TO_REACH_OPERATOR" :clip="true">
    <p class="t-data text-mid">
      Async preferred. Email lands fastest for project work; LinkedIn is fine
      for handshakes; the social channels exist but I check them in pulses.
      For new project briefs, lead with a one-paragraph problem statement —
      I'll route it from there.
    </p>
  </Panel>

  <h2 class="t-header mt-6 mb-3" style="font-size:14px;color:var(--rose-500)">
    CHANNELS <span class="t-micro" style="margin-left:6px">[{{ channels.length }}]</span>
  </h2>

  <div class="channels">
    <a v-for="c in channels" :key="c.label"
       :href="c.href" target="_blank" rel="noopener"
       class="channel clip-corner">
      <span class="mso">{{ c.icon }}</span>
      <div>
        <div class="label">{{ c.label }}</div>
        <div class="handle">{{ c.handle }}</div>
      </div>
    </a>
  </div>

  <Terminal title="OUTGOING_BEACON" class="mt-6" :lines="[
    'AWAITING_INBOUND…',
    'PREFERRED_FORMAT: TEXT',
    'AVERAGE_RESPONSE: 24-72H',
    'TIMEZONE: UTC+2',
  ]" />
</template>
