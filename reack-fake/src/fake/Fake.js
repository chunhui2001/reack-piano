function Fake (name) {
	return new Proxy(eval(name), {});
}

// Usage:
// import { Fake } from 'reack-fake';

// const moment = Fake('moment');
// const Immutable = Fake('Immutable');
// const _lodash = Fake('_');
// const randomColor = Fake('randomColor');

export default Fake;
