document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector('.toggle');
  const nav = document.querySelector('.header nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
      toggle.textContent = nav.classList.contains('open') ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open')),
    );
  }

  const tabs = document.querySelectorAll('[data-tab]');
  const groups = document.querySelectorAll('[data-menu]');

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      groups.forEach((g) =>
        g.classList.toggle('hidden', g.dataset.menu !== tab.dataset.tab),
      );
    }),
  );

  const form = document.querySelector('#booking-form');

  if (form) {
    const date = form.querySelector('#date');
    const today = new Date();
    const min = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);

    date.min = min;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('.error').forEach((x) => (x.textContent = ''));
      form.querySelectorAll('.invalid').forEach((x) =>
        x.classList.remove('invalid'),
      );

      const status = form.querySelector('.status');
      status.textContent = '';
      status.className = 'status';

      const rules = [
        [
          '#name',
          (v) => v.trim().length >= 2,
          'Enter your name (at least 2 characters).',
        ],
        [
          '#email',
          (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
          'Enter a valid email address.',
        ],
        [
          '#phone',
          (v) => /^[6-9]\\d{9}$/.test(v.replace(/\\s/g, '')),
          'Enter a valid 10-digit Indian mobile number.',
        ],
        ['#date', (v) => v >= min, 'Choose today or a future date.'],
        ['#time', (v) => !!v, 'Choose a preferred time.'],
        ['#guests', (v) => !!v, 'Select the number of guests.'],
      ];

      rules.forEach(([sel, test, msg]) => {
        const field = form.querySelector(sel);

        if (!test(field.value)) {
          valid = false;
          field.classList.add('invalid');
          field.parentElement.querySelector('.error').textContent = msg;
        }
      });

      if (!form.querySelector('#consent').checked) {
        valid = false;
        form.querySelector('.consenterror').textContent =
          'Please agree before submitting.';
      }

      if (!valid) {
        status.textContent = 'Please correct the highlighted fields.';
        status.classList.add('failure');
        return;
      }

      const name = form.querySelector('#name').value;
      status.textContent = `Thanks, ${name}! Your booking request is ready. This demo does not send reservations to a server.`;
      status.classList.add('success');
      form.reset();
    });
  }
});
