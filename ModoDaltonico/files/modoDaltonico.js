(function () {
	'use strict';

	var config = window.ModoDaltonicoConfig || {};
	var STORAGE_KEY_ACTIVE = 'md_active';
	var STORAGE_KEY_MODE = 'md_mode';

	function getStored(key) {
		try {
			return localStorage.getItem(key);
		} catch (e) {
			return null;
		}
	}

	function setStored(key, value) {
		try {
			localStorage.setItem(key, value);
		} catch (e) {
			// storage unavailable
		}
	}

	function isActive() {
		var stored = getStored(STORAGE_KEY_ACTIVE);
		if (stored === 'true') return true;
		if (stored === 'false') return false;
		return !!config.initialActive;
	}

	function getMode() {
		var stored = getStored(STORAGE_KEY_MODE);
		if (stored && ['protanopia', 'deuteranopia', 'tritanopia'].indexOf(stored) !== -1) {
			return stored;
		}
		return config.contrastType || 'protanopia';
	}

	function injectSvgFilters() {
		if (document.getElementById('md-svg-filters')) return;

		var ns = 'http://www.w3.org/2000/svg';
		var svg = document.createElementNS(ns, 'svg');
		svg.setAttribute('id', 'md-svg-filters');
		svg.setAttribute('aria-hidden', 'true');
		svg.style.position = 'absolute';
		svg.style.width = '0';
		svg.style.height = '0';
		svg.style.overflow = 'hidden';

		var filters = {
			'md-filter-protanopia': [
				0.567, 0.433, 0,     0, 0,
				0.558, 0.442, 0,     0, 0,
				0,     0.242, 0.758, 0, 0,
				0,     0,     0,     1, 0
			],
			'md-filter-deuteranopia': [
				0.625, 0.375, 0,   0, 0,
				0.7,   0.3,   0,   0, 0,
				0,     0.3,   0.7, 0, 0,
				0,     0,     0,   1, 0
			],
			'md-filter-tritanopia': [
				0.95, 0.05, 0,     0, 0,
				0,    0.433, 0.567, 0, 0,
				0,    0.475, 0.525, 0, 0,
				0,    0,     0,     1, 0
			]
		};

		var defs = document.createElementNS(ns, 'defs');

		Object.keys(filters).forEach(function (id) {
			var filter = document.createElementNS(ns, 'filter');
			filter.setAttribute('id', id);
			filter.setAttribute('color-interpolation-filters', 'linearRGB');

			var matrix = document.createElementNS(ns, 'feColorMatrix');
			matrix.setAttribute('type', 'matrix');
			matrix.setAttribute('values', filters[id].join(' '));

			filter.appendChild(matrix);
			defs.appendChild(filter);
		});

		svg.appendChild(defs);
		document.body.appendChild(svg);
	}

	function applyMode(mode) {
		var html = document.documentElement;
		html.classList.remove('md-protanopia', 'md-deuteranopia', 'md-tritanopia');
		html.classList.add('md-' + mode);
	}

	function removeMode() {
		var html = document.documentElement;
		html.classList.remove('md-protanopia', 'md-deuteranopia', 'md-tritanopia');
	}

	function updateUI(active, mode) {
		var btn = document.getElementById('md-toggle-btn');
		var badge = document.getElementById('md-badge');
		var selector = document.getElementById('md-mode-selector');

		if (btn) {
			btn.setAttribute('aria-pressed', active ? 'true' : 'false');
			btn.title = active
				? (config.strings && config.strings.desactivar || 'Deactivate')
				: (config.strings && config.strings.activar || 'Activate');
		}

		if (badge) {
			if (active) {
				badge.classList.add('md-badge-active');
				var label = config.strings && config.strings[mode] || mode;
				badge.textContent = (config.activeLabel || 'Active') + ': ' + label;
			} else {
				badge.classList.remove('md-badge-active');
			}
		}

		if (selector) {
			if (active) {
				selector.classList.add('md-visible');
			} else {
				selector.classList.remove('md-visible');
			}
		}

		if (active) {
			applyMode(mode);
		} else {
			removeMode();
		}
	}

	function toggleActive() {
		var active = !isActive();
		var mode = getMode();
		setStored(STORAGE_KEY_ACTIVE, active ? 'true' : 'false');
		updateUI(active, mode);
	}

	function changeMode(newMode) {
		setStored(STORAGE_KEY_MODE, newMode);
		if (isActive()) {
			applyMode(newMode);
			updateUI(true, newMode);
		}
	}

	function buildUI() {
		var container = document.createElement('div');
		container.className = 'md-toggle-container';

		var badge = document.createElement('div');
		badge.className = 'md-badge';
		badge.id = 'md-badge';
		badge.setAttribute('aria-live', 'polite');
		container.appendChild(badge);

		var selectorWrap = document.createElement('div');
		selectorWrap.className = 'md-mode-selector';
		selectorWrap.id = 'md-mode-selector';

		var select = document.createElement('select');
		select.id = 'md-mode-select';
		select.setAttribute('aria-label',
			config.strings && config.strings.activar || 'Select mode');

		var modes = ['protanopia', 'deuteranopia', 'tritanopia'];
		var currentMode = getMode();
		modes.forEach(function (m) {
			var opt = document.createElement('option');
			opt.value = m;
			opt.textContent = config.strings && config.strings[m] || m;
			if (m === currentMode) opt.selected = true;
			select.appendChild(opt);
		});

		selectorWrap.appendChild(select);
		container.appendChild(selectorWrap);

		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'md-toggle-btn';
		btn.id = 'md-toggle-btn';
		btn.setAttribute('aria-pressed', 'false');
		btn.innerHTML = '&#x1f441;';
		btn.title = config.strings && config.strings.activar || 'Activate';
		container.appendChild(btn);

		document.body.appendChild(container);

		btn.addEventListener('click', function () {
			toggleActive();
		});

		select.addEventListener('change', function () {
			changeMode(this.value);
		});
	}

	function init() {
		injectSvgFilters();
		buildUI();

		var active = isActive();
		var mode = getMode();

		if (active) {
			setStored(STORAGE_KEY_ACTIVE, 'true');
		} else if (getStored(STORAGE_KEY_ACTIVE) === null) {
			setStored(STORAGE_KEY_ACTIVE, config.initialActive ? 'true' : 'false');
			active = !!config.initialActive;
		}

		updateUI(active, mode);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
