var Ih = Object.defineProperty,
  wh = Object.defineProperties;
var Dh = Object.getOwnPropertyDescriptors;
var vl = Object.getOwnPropertySymbols;
var Ch = Object.prototype.hasOwnProperty,
  bh = Object.prototype.propertyIsEnumerable;
var yl = (e, t, n) =>
    t in e ? Ih(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (e[t] = n),
  g = (e, t) => {
    for (var n in (t ||= {})) Ch.call(t, n) && yl(e, n, t[n]);
    if (vl) for (var n of vl(t)) bh.call(t, n) && yl(e, n, t[n]);
    return e;
  },
  j = (e, t) => wh(e, Dh(t));
var Ji;
function Zr() {
  return Ji;
}
function xe(e) {
  let t = Ji;
  return (Ji = e), t;
}
var El = Symbol('NotFound');
function Gt(e) {
  return e === El || e?.name === '\u0275NotFound';
}
var X = null,
  Qr = !1,
  Xi = 1,
  Sh = null,
  re = Symbol('SIGNAL');
function _(e) {
  let t = X;
  return (X = e), t;
}
function Kr() {
  return X;
}
var Ln = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producers: void 0,
  producersTail: void 0,
  consumers: void 0,
  consumersTail: void 0,
  recomputing: !1,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  kind: 'unknown',
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Fn(e) {
  if (Qr) throw new Error('');
  if (X === null) return;
  X.consumerOnSignalRead(e);
  let t = X.producersTail;
  if (t !== void 0 && t.producer === e) return;
  let n,
    r = X.recomputing;
  if (r && ((n = t !== void 0 ? t.nextProducer : X.producers), n !== void 0 && n.producer === e)) {
    (X.producersTail = n), (n.lastReadVersion = e.version);
    return;
  }
  let o = e.consumersTail;
  if (o !== void 0 && o.consumer === X && (!r || _h(o, X))) return;
  let i = Wt(X),
    s = {
      producer: e,
      consumer: X,
      nextProducer: n,
      prevConsumer: o,
      lastReadVersion: e.version,
      nextConsumer: void 0,
    };
  (X.producersTail = s), t !== void 0 ? (t.nextProducer = s) : (X.producers = s), i && Cl(e, s);
}
function Il() {
  Xi++;
}
function es(e) {
  if (!(Wt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Xi)) {
    if (!e.producerMustRecompute(e) && !Hn(e)) {
      Yr(e);
      return;
    }
    e.producerRecomputeValue(e), Yr(e);
  }
}
function ts(e) {
  if (e.consumers === void 0) return;
  let t = Qr;
  Qr = !0;
  try {
    for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
      let r = n.consumer;
      r.dirty || Th(r);
    }
  } finally {
    Qr = t;
  }
}
function ns() {
  return X?.consumerAllowSignalWrites !== !1;
}
function Th(e) {
  (e.dirty = !0), ts(e), e.consumerMarkedDirty?.(e);
}
function Yr(e) {
  (e.dirty = !1), (e.lastCleanEpoch = Xi);
}
function jn(e) {
  return e && wl(e), _(e);
}
function wl(e) {
  (e.producersTail = void 0), (e.recomputing = !0);
}
function Jr(e, t) {
  _(t), e && Dl(e);
}
function Dl(e) {
  e.recomputing = !1;
  let t = e.producersTail,
    n = t !== void 0 ? t.nextProducer : e.producers;
  if (n !== void 0) {
    if (Wt(e))
      do n = rs(n);
      while (n !== void 0);
    t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
  }
}
function Hn(e) {
  for (let t = e.producers; t !== void 0; t = t.nextProducer) {
    let n = t.producer,
      r = t.lastReadVersion;
    if (r !== n.version || (es(n), r !== n.version)) return !0;
  }
  return !1;
}
function Vn(e) {
  if (Wt(e)) {
    let t = e.producers;
    for (; t !== void 0; ) t = rs(t);
  }
  (e.producers = void 0),
    (e.producersTail = void 0),
    (e.consumers = void 0),
    (e.consumersTail = void 0);
}
function Cl(e, t) {
  let n = e.consumersTail,
    r = Wt(e);
  if (
    (n !== void 0
      ? ((t.nextConsumer = n.nextConsumer), (n.nextConsumer = t))
      : ((t.nextConsumer = void 0), (e.consumers = t)),
    (t.prevConsumer = n),
    (e.consumersTail = t),
    !r)
  )
    for (let o = e.producers; o !== void 0; o = o.nextProducer) Cl(o.producer, o);
}
function rs(e) {
  let t = e.producer,
    n = e.nextProducer,
    r = e.nextConsumer,
    o = e.prevConsumer;
  if (
    ((e.nextConsumer = void 0),
    (e.prevConsumer = void 0),
    r !== void 0 ? (r.prevConsumer = o) : (t.consumersTail = o),
    o !== void 0)
  )
    o.nextConsumer = r;
  else if (((t.consumers = r), !Wt(t))) {
    let i = t.producers;
    for (; i !== void 0; ) i = rs(i);
  }
  return n;
}
function Wt(e) {
  return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function os(e) {
  Sh?.(e);
}
function _h(e, t) {
  let n = t.producersTail;
  if (n !== void 0) {
    let r = t.producers;
    do {
      if (r === e) return !0;
      if (r === n) break;
      r = r.nextProducer;
    } while (r !== void 0);
  }
  return !1;
}
function is(e, t) {
  return Object.is(e, t);
}
function Mh() {
  throw new Error();
}
var bl = Mh;
function Sl(e) {
  bl(e);
}
function ss(e) {
  bl = e;
}
var Nh = null;
function as(e, t) {
  let n = Object.create(Xr);
  (n.value = e), t !== void 0 && (n.equal = t);
  let r = () => Tl(n);
  return (r[re] = n), os(n), [r, (s) => Zt(n, s), (s) => cs(n, s)];
}
function Tl(e) {
  return Fn(e), e.value;
}
function Zt(e, t) {
  ns() || Sl(e), e.equal(e.value, t) || ((e.value = t), Rh(e));
}
function cs(e, t) {
  ns() || Sl(e), Zt(e, t(e.value));
}
var Xr = j(g({}, Ln), { equal: is, value: void 0, kind: 'signal' });
function Rh(e) {
  e.version++, Il(), ts(e), Nh?.(e);
}
function w(e) {
  return typeof e == 'function';
}
function Qt(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n;
}
var eo = Qt(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = n);
    }
);
function Un(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var H = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n))) for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (w(r))
        try {
          r();
        } catch (i) {
          t = i instanceof eo ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            _l(i);
          } catch (s) {
            (t = t ?? []), s instanceof eo ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new eo(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) _l(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && Un(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && Un(n, t), t instanceof e && t._removeParent(this);
  }
};
H.EMPTY = (() => {
  let e = new H();
  return (e.closed = !0), e;
})();
var ls = H.EMPTY;
function to(e) {
  return e instanceof H || (e && 'closed' in e && w(e.remove) && w(e.add) && w(e.unsubscribe));
}
function _l(e) {
  w(e) ? e() : e.unsubscribe();
}
var Ce = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Yt = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = Yt;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = Yt;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function no(e) {
  Yt.setTimeout(() => {
    let { onUnhandledError: t } = Ce;
    if (t) t(e);
    else throw e;
  });
}
function $n() {}
var Ml = us('C', void 0, void 0);
function Nl(e) {
  return us('E', void 0, e);
}
function Rl(e) {
  return us('N', e, void 0);
}
function us(e, t, n) {
  return { kind: e, value: t, error: n };
}
var Et = null;
function Kt(e) {
  if (Ce.useDeprecatedSynchronousErrorHandling) {
    let t = !Et;
    if ((t && (Et = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = Et;
      if (((Et = null), n)) throw r;
    }
  } else e();
}
function xl(e) {
  Ce.useDeprecatedSynchronousErrorHandling && Et && ((Et.errorThrown = !0), (Et.error = e));
}
var It = class extends H {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t ? ((this.destination = t), to(t) && t.add(this)) : (this.destination = Oh);
    }
    static create(t, n, r) {
      return new Jt(t, n, r);
    }
    next(t) {
      this.isStopped ? fs(Rl(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped ? fs(Nl(t), this) : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? fs(Ml, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  xh = Function.prototype.bind;
function ds(e, t) {
  return xh.call(e, t);
}
var ps = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          ro(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          ro(r);
        }
      else ro(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          ro(n);
        }
    }
  },
  Jt = class extends It {
    constructor(t, n, r) {
      super();
      let o;
      if (w(t) || !t) o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && Ce.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && ds(t.next, i),
              error: t.error && ds(t.error, i),
              complete: t.complete && ds(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new ps(o);
    }
  };
function ro(e) {
  Ce.useDeprecatedSynchronousErrorHandling ? xl(e) : no(e);
}
function Ah(e) {
  throw e;
}
function fs(e, t) {
  let { onStoppedNotification: n } = Ce;
  n && Yt.setTimeout(() => n(e, t));
}
var Oh = { closed: !0, next: $n, error: Ah, complete: $n };
var Xt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function de(e) {
  return e;
}
function hs(...e) {
  return gs(e);
}
function gs(e) {
  return e.length === 0
    ? de
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce((r, o) => o(r), n);
      };
}
var x = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Ph(n) ? n : new Jt(n, r, o);
      return (
        Kt(() => {
          let { operator: s, source: a } = this;
          i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = Al(r)),
        new r((o, i) => {
          let s = new Jt({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n);
    }
    [Xt]() {
      return this;
    }
    pipe(...n) {
      return gs(n)(this);
    }
    toPromise(n) {
      return (
        (n = Al(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function Al(e) {
  var t;
  return (t = e ?? Ce.Promise) !== null && t !== void 0 ? t : Promise;
}
function kh(e) {
  return e && w(e.next) && w(e.error) && w(e.complete);
}
function Ph(e) {
  return (e && e instanceof It) || (kh(e) && to(e));
}
function ms(e) {
  return w(e?.lift);
}
function M(e) {
  return (t) => {
    if (ms(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function N(e, t, n, r, o) {
  return new vs(e, t, n, r, o);
}
var vs = class extends It {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function en() {
  return M((e, t) => {
    let n = null;
    e._refCount++;
    let r = N(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var tn = class extends x {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      ms(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (!t || t.isStopped) && (this._subject = this.subjectFactory()), this._subject;
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new H();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          N(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = H.EMPTY));
    }
    return t;
  }
  refCount() {
    return en()(this);
  }
};
var Ol = Qt(
  (e) =>
    function () {
      e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
    }
);
var W = (() => {
    class e extends x {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new oo(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Ol();
      }
      next(n) {
        Kt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers || (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Kt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Kt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? ls
          : ((this.currentObservers = null),
            i.push(n),
            new H(() => {
              (this.currentObservers = null), Un(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new x();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new oo(t, n)), e;
  })(),
  oo = class extends W {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null &&
        r !== void 0
        ? r
        : ls;
    }
  };
var Z = class extends W {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var oe = new x((e) => e.complete());
function kl(e) {
  return e && w(e.schedule);
}
function Pl(e) {
  return e[e.length - 1];
}
function Ll(e) {
  return w(Pl(e)) ? e.pop() : void 0;
}
function nt(e) {
  return kl(Pl(e)) ? e.pop() : void 0;
}
function jl(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? i(u.value) : o(u.value).then(a, c);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
function Fl(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      },
    };
  throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function wt(e) {
  return this instanceof wt ? ((this.v = e), this) : new wt(e);
}
function Hl(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create((typeof AsyncIterator == 'function' ? AsyncIterator : Object).prototype)),
    a('next'),
    a('throw'),
    a('return', s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (m) {
      return Promise.resolve(m).then(f, d);
    };
  }
  function a(f, m) {
    r[f] &&
      ((o[f] = function (C) {
        return new Promise(function (L, P) {
          i.push([f, C, L, P]) > 1 || c(f, C);
        });
      }),
      m && (o[f] = m(o[f])));
  }
  function c(f, m) {
    try {
      l(r[f](m));
    } catch (C) {
      p(i[0][3], C);
    }
  }
  function l(f) {
    f.value instanceof wt ? Promise.resolve(f.value.v).then(u, d) : p(i[0][2], f);
  }
  function u(f) {
    c('next', f);
  }
  function d(f) {
    c('throw', f);
  }
  function p(f, m) {
    f(m), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function Vl(e) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Fl == 'function' ? Fl(e) : e[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (l) {
      i({ value: l, done: a });
    }, s);
  }
}
var io = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function so(e) {
  return w(e?.then);
}
function ao(e) {
  return w(e[Xt]);
}
function co(e) {
  return Symbol.asyncIterator && w(e?.[Symbol.asyncIterator]);
}
function lo(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Lh() {
  return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var uo = Lh();
function fo(e) {
  return w(e?.[uo]);
}
function po(e) {
  return Hl(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield wt(n.read());
        if (o) return yield wt(void 0);
        yield yield wt(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function ho(e) {
  return w(e?.getReader);
}
function z(e) {
  if (e instanceof x) return e;
  if (e != null) {
    if (ao(e)) return Fh(e);
    if (io(e)) return jh(e);
    if (so(e)) return Hh(e);
    if (co(e)) return Ul(e);
    if (fo(e)) return Vh(e);
    if (ho(e)) return Uh(e);
  }
  throw lo(e);
}
function Fh(e) {
  return new x((t) => {
    let n = e[Xt]();
    if (w(n.subscribe)) return n.subscribe(t);
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function jh(e) {
  return new x((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Hh(e) {
  return new x((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, no);
  });
}
function Vh(e) {
  return new x((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Ul(e) {
  return new x((t) => {
    $h(e, t).catch((n) => t.error(n));
  });
}
function Uh(e) {
  return Ul(po(e));
}
function $h(e, t) {
  var n, r, o, i;
  return jl(this, void 0, void 0, function* () {
    try {
      for (n = Vl(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function ie(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function go(e, t = 0) {
  return M((n, r) => {
    n.subscribe(
      N(
        r,
        (o) => ie(r, e, () => r.next(o), t),
        () => ie(r, e, () => r.complete(), t),
        (o) => ie(r, e, () => r.error(o), t)
      )
    );
  });
}
function mo(e, t = 0) {
  return M((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function $l(e, t) {
  return z(e).pipe(mo(t), go(t));
}
function Bl(e, t) {
  return z(e).pipe(mo(t), go(t));
}
function zl(e, t) {
  return new x((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function ql(e, t) {
  return new x((n) => {
    let r;
    return (
      ie(n, t, () => {
        (r = e[uo]()),
          ie(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => w(r?.return) && r.return()
    );
  });
}
function vo(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new x((n) => {
    ie(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      ie(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Gl(e, t) {
  return vo(po(e), t);
}
function Wl(e, t) {
  if (e != null) {
    if (ao(e)) return $l(e, t);
    if (io(e)) return zl(e, t);
    if (so(e)) return Bl(e, t);
    if (co(e)) return vo(e, t);
    if (fo(e)) return ql(e, t);
    if (ho(e)) return Gl(e, t);
  }
  throw lo(e);
}
function V(e, t) {
  return t ? Wl(e, t) : z(e);
}
function I(...e) {
  let t = nt(e);
  return V(e, t);
}
function nn(e, t) {
  let n = w(e) ? e : () => e,
    r = (o) => o.error(n());
  return new x(t ? (o) => t.schedule(r, 0, o) : r);
}
function ys(e) {
  return !!e && (e instanceof x || (w(e.lift) && w(e.subscribe)));
}
var Ue = Qt(
  (e) =>
    function () {
      e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
    }
);
function R(e, t) {
  return M((n, r) => {
    let o = 0;
    n.subscribe(
      N(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Bh } = Array;
function zh(e, t) {
  return Bh(t) ? e(...t) : e(t);
}
function Zl(e) {
  return R((t) => zh(e, t));
}
var { isArray: qh } = Array,
  { getPrototypeOf: Gh, prototype: Wh, keys: Zh } = Object;
function Ql(e) {
  if (e.length === 1) {
    let t = e[0];
    if (qh(t)) return { args: t, keys: null };
    if (Qh(t)) {
      let n = Zh(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Qh(e) {
  return e && typeof e == 'object' && Gh(e) === Wh;
}
function Yl(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function yo(...e) {
  let t = nt(e),
    n = Ll(e),
    { args: r, keys: o } = Ql(e);
  if (r.length === 0) return V([], t);
  let i = new x(Yh(r, t, o ? (s) => Yl(o, s) : de));
  return n ? i.pipe(Zl(n)) : i;
}
function Yh(e, t, n = de) {
  return (r) => {
    Kl(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          Kl(
            t,
            () => {
              let l = V(e[c], t),
                u = !1;
              l.subscribe(
                N(
                  r,
                  (d) => {
                    (i[c] = d), u || ((u = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function Kl(e, t, n) {
  e ? ie(n, e, t) : t();
}
function Jl(e, t, n, r, o, i, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    p = () => {
      d && !c.length && !l && t.complete();
    },
    f = (C) => (l < r ? m(C) : c.push(C)),
    m = (C) => {
      i && t.next(C), l++;
      let L = !1;
      z(n(C, u++)).subscribe(
        N(
          t,
          (P) => {
            o?.(P), i ? f(P) : t.next(P);
          },
          () => {
            L = !0;
          },
          void 0,
          () => {
            if (L)
              try {
                for (l--; c.length && l < r; ) {
                  let P = c.shift();
                  s ? ie(t, s, () => m(P)) : m(P);
                }
                p();
              } catch (P) {
                t.error(P);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      N(t, f, () => {
        (d = !0), p();
      })
    ),
    () => {
      a?.();
    }
  );
}
function U(e, t, n = 1 / 0) {
  return w(t)
    ? U((r, o) => R((i, s) => t(r, i, o, s))(z(e(r, o))), n)
    : (typeof t == 'number' && (n = t), M((r, o) => Jl(r, o, e, n)));
}
function Xl(e = 1 / 0) {
  return U(de, e);
}
function eu() {
  return Xl(1);
}
function rn(...e) {
  return eu()(V(e, nt(e)));
}
function Bn(e) {
  return new x((t) => {
    z(e()).subscribe(t);
  });
}
function ge(e, t) {
  return M((n, r) => {
    let o = 0;
    n.subscribe(N(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function rt(e) {
  return M((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      N(n, void 0, void 0, (s) => {
        (i = z(e(s, rt(e)(t)))), r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function tu(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      l = 0;
    i.subscribe(
      N(
        s,
        (u) => {
          let d = l++;
          (c = a ? e(c, u, d) : ((a = !0), u)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function on(e, t) {
  return w(t) ? U(e, t, 1) : U(e, 1);
}
function ot(e) {
  return M((t, n) => {
    let r = !1;
    t.subscribe(
      N(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function $e(e) {
  return e <= 0
    ? () => oe
    : M((t, n) => {
        let r = 0;
        t.subscribe(
          N(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function Eo(e = Kh) {
  return M((t, n) => {
    let r = !1;
    t.subscribe(
      N(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function Kh() {
  return new Ue();
}
function zn(e) {
  return M((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Be(e, t) {
  let n = arguments.length >= 2;
  return (r) => r.pipe(e ? ge((o, i) => e(o, i, r)) : de, $e(1), n ? ot(t) : Eo(() => new Ue()));
}
function sn(e) {
  return e <= 0
    ? () => oe
    : M((t, n) => {
        let r = [];
        t.subscribe(
          N(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function Es(e, t) {
  let n = arguments.length >= 2;
  return (r) => r.pipe(e ? ge((o, i) => e(o, i, r)) : de, sn(1), n ? ot(t) : Eo(() => new Ue()));
}
function Is(e, t) {
  return M(tu(e, t, arguments.length >= 2, !0));
}
function ws(...e) {
  let t = nt(e);
  return M((n, r) => {
    (t ? rn(e, n, t) : rn(e, n)).subscribe(r);
  });
}
function se(e, t) {
  return M((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      N(
        r,
        (c) => {
          o?.unsubscribe();
          let l = 0,
            u = i++;
          z(e(c, u)).subscribe(
            (o = N(
              r,
              (d) => r.next(t ? t(c, d, u, l++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function Io(e) {
  return M((t, n) => {
    z(e).subscribe(N(n, () => n.complete(), $n)), !n.closed && t.subscribe(n);
  });
}
function q(e, t, n) {
  let r = w(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? M((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          N(
            i,
            (c) => {
              var l;
              (l = r.next) === null || l === void 0 || l.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1), (c = r.complete) === null || c === void 0 || c.call(r), i.complete();
            },
            (c) => {
              var l;
              (a = !1), (l = r.error) === null || l === void 0 || l.call(r, c), i.error(c);
            },
            () => {
              var c, l;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (l = r.finalize) === null || l === void 0 || l.call(r);
            }
          )
        );
      })
    : de;
}
function nu(e) {
  let t = _(null);
  try {
    return e();
  } finally {
    _(t);
  }
}
var So = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss',
  v = class extends Error {
    code;
    constructor(t, n) {
      super(Zn(t, n)), (this.code = t);
    }
  };
function Jh(e) {
  return `NG0${Math.abs(e)}`;
}
function Zn(e, t) {
  return `${Jh(e)}${t ? ': ' + t : ''}`;
}
function O(e) {
  for (let t in e) if (e[t] === O) return t;
  throw Error('');
}
function it(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return `[${e.map(it).join(', ')}]`;
  if (e == null) return '' + e;
  let t = e.overriddenName || e.name;
  if (t) return `${t}`;
  let n = e.toString();
  if (n == null) return '' + n;
  let r = n.indexOf(`
`);
  return r >= 0 ? n.slice(0, r) : n;
}
function To(e, t) {
  return e ? (t ? `${e} ${t}` : e) : t || '';
}
var Xh = O({ __forward_ref__: O });
function _o(e) {
  return (
    (e.__forward_ref__ = _o),
    (e.toString = function () {
      return it(this());
    }),
    e
  );
}
function ae(e) {
  return Os(e) ? e() : e;
}
function Os(e) {
  return typeof e == 'function' && e.hasOwnProperty(Xh) && e.__forward_ref__ === _o;
}
function E(e) {
  return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function Qn(e) {
  return eg(e, Mo);
}
function ks(e) {
  return Qn(e) !== null;
}
function eg(e, t) {
  return (e.hasOwnProperty(t) && e[t]) || null;
}
function tg(e) {
  let t = e?.[Mo] ?? null;
  return t || null;
}
function Cs(e) {
  return e && e.hasOwnProperty(Do) ? e[Do] : null;
}
var Mo = O({ ɵprov: O }),
  Do = O({ ɵinj: O }),
  y = class {
    _desc;
    ngMetadataName = 'InjectionToken';
    ɵprov;
    constructor(t, n) {
      (this._desc = t),
        (this.ɵprov = void 0),
        typeof n == 'number'
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = E({
              token: this,
              providedIn: n.providedIn || 'root',
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Ps(e) {
  return e && !!e.ɵproviders;
}
var Ls = O({ ɵcmp: O }),
  Fs = O({ ɵdir: O }),
  js = O({ ɵpipe: O }),
  Hs = O({ ɵmod: O }),
  Gn = O({ ɵfac: O }),
  _t = O({ __NG_ELEMENT_ID__: O }),
  ou = O({ __NG_ENV_ID__: O });
function No(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
function su(e) {
  return typeof e == 'function'
    ? e.name || e.toString()
    : typeof e == 'object' && e != null && typeof e.type == 'function'
    ? e.type.name || e.type.toString()
    : No(e);
}
var au = O({ ngErrorCode: O }),
  ng = O({ ngErrorMessage: O }),
  rg = O({ ngTokenPath: O });
function Vs(e, t) {
  return cu('', -200, t);
}
function Ro(e, t) {
  throw new v(-201, !1);
}
function cu(e, t, n) {
  let r = new v(t, e);
  return (r[au] = t), (r[ng] = e), n && (r[rg] = n), r;
}
function og(e) {
  return e[au];
}
var bs;
function lu() {
  return bs;
}
function fe(e) {
  let t = bs;
  return (bs = e), t;
}
function Us(e, t, n) {
  let r = Qn(e);
  if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & 8) return null;
  if (t !== void 0) return t;
  Ro(e, 'Injector');
}
var ig = {},
  Dt = ig,
  sg = '__NG_DI_FLAG__',
  Ss = class {
    injector;
    constructor(t) {
      this.injector = t;
    }
    retrieve(t, n) {
      let r = Ct(n) || 0;
      try {
        return this.injector.get(t, r & 8 ? null : Dt, r);
      } catch (o) {
        if (Gt(o)) return o;
        throw o;
      }
    }
  };
function ag(e, t = 0) {
  let n = Zr();
  if (n === void 0) throw new v(-203, !1);
  if (n === null) return Us(e, void 0, t);
  {
    let r = cg(t),
      o = n.retrieve(e, r);
    if (Gt(o)) {
      if (r.optional) return null;
      throw o;
    }
    return o;
  }
}
function b(e, t = 0) {
  return (lu() || ag)(ae(e), t);
}
function h(e, t) {
  return b(e, Ct(t));
}
function Ct(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function cg(e) {
  return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
}
function Ts(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = ae(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new v(900, !1);
      let o,
        i = 0;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = lg(a);
        typeof c == 'number' ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(b(o, i));
    } else t.push(b(r));
  }
  return t;
}
function lg(e) {
  return e[sg];
}
function bt(e, t) {
  let n = e.hasOwnProperty(Gn);
  return n ? e[Gn] : null;
}
function xo(e, t) {
  e.forEach((n) => (Array.isArray(n) ? xo(n, t) : t(n)));
}
function $s(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Yn(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function uu(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function Bs(e, t, n) {
  let r = cn(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), uu(e, r, t, n)), r;
}
function Ao(e, t) {
  let n = cn(e, t);
  if (n >= 0) return e[n | 1];
}
function cn(e, t) {
  return ug(e, t, 1);
}
function ug(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Mt = {},
  Ae = [],
  qe = new y(''),
  zs = new y('', -1),
  qs = new y(''),
  Wn = class {
    get(t, n = Dt) {
      if (n === Dt) {
        let o = cu('', -201);
        throw ((o.name = '\u0275NotFound'), o);
      }
      return n;
    }
  };
function Gs(e) {
  return e[Hs] || null;
}
function at(e) {
  return e[Ls] || null;
}
function Ws(e) {
  return e[Fs] || null;
}
function du(e) {
  return e[js] || null;
}
function Nt(e) {
  return { ɵproviders: e };
}
function fu(e) {
  return Nt([{ provide: qe, multi: !0, useValue: e }]);
}
function pu(...e) {
  return { ɵproviders: Zs(!0, e), ɵfromNgModule: !0 };
}
function Zs(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    xo(t, (s) => {
      let a = s;
      Co(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && hu(o, i),
    n
  );
}
function hu(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Qs(o, (i) => {
      t(i, r);
    });
  }
}
function Co(e, t, n, r) {
  if (((e = ae(e)), !e)) return !1;
  let o = null,
    i = Cs(e),
    s = !i && at(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Cs(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c = typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let l of c) Co(l, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      try {
        xo(i.imports, (u) => {
          Co(u, t, n, r) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && hu(l, t);
    }
    if (!a) {
      let l = bt(o) || (() => new o());
      t({ provide: o, useFactory: l, deps: Ae }, o),
        t({ provide: qs, useValue: o, multi: !0 }, o),
        t({ provide: qe, useValue: () => b(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      Qs(c, (u) => {
        t(u, l);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function Qs(e, t) {
  for (let n of e) Ps(n) && (n = n.ɵproviders), Array.isArray(n) ? Qs(n, t) : t(n);
}
var dg = O({ provide: String, useValue: O });
function gu(e) {
  return e !== null && typeof e == 'object' && dg in e;
}
function fg(e) {
  return !!(e && e.useExisting);
}
function pg(e) {
  return !!(e && e.useFactory);
}
function bo(e) {
  return typeof e == 'function';
}
var Kn = new y(''),
  wo = {},
  iu = {},
  Ds;
function Jn() {
  return Ds === void 0 && (Ds = new Wn()), Ds;
}
var Q = class {},
  St = class extends Q {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = !1;
    injectorDefTypes;
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        Ms(t, (s) => this.processProvider(s)),
        this.records.set(zs, an(void 0, this)),
        o.has('environment') && this.records.set(Q, an(void 0, this));
      let i = this.records.get(Kn);
      i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(qs, Ae, { self: !0 })));
    }
    retrieve(t, n) {
      let r = Ct(n) || 0;
      try {
        return this.get(t, Dt, r);
      } catch (o) {
        if (Gt(o)) return o;
        throw o;
      }
    }
    destroy() {
      qn(this), (this._destroyed = !0);
      let t = _(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), _(t);
      }
    }
    onDestroy(t) {
      return qn(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t);
    }
    runInContext(t) {
      qn(this);
      let n = xe(this),
        r = fe(void 0),
        o;
      try {
        return t();
      } finally {
        xe(n), fe(r);
      }
    }
    get(t, n = Dt, r) {
      if ((qn(this), t.hasOwnProperty(ou))) return t[ou](this);
      let o = Ct(r),
        i,
        s = xe(this),
        a = fe(void 0);
      try {
        if (!(o & 4)) {
          let l = this.records.get(t);
          if (l === void 0) {
            let u = yg(t) && Qn(t);
            u && this.injectableDefInScope(u) ? (l = an(_s(t), wo)) : (l = null),
              this.records.set(t, l);
          }
          if (l != null) return this.hydrate(t, l, o);
        }
        let c = o & 2 ? Jn() : this.parent;
        return (n = o & 8 && n === Dt ? null : n), c.get(t, n);
      } catch (c) {
        let l = og(c);
        throw l === -200 || l === -201 ? new v(l, null) : c;
      } finally {
        fe(a), xe(s);
      }
    }
    resolveInjectorInitializers() {
      let t = _(null),
        n = xe(this),
        r = fe(void 0),
        o;
      try {
        let i = this.get(qe, Ae, { self: !0 });
        for (let s of i) s();
      } finally {
        xe(n), fe(r), _(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(it(r));
      return `R3Injector[${t.join(', ')}]`;
    }
    processProvider(t) {
      t = ae(t);
      let n = bo(t) ? t : ae(t && t.provide),
        r = gg(t);
      if (!bo(t) && t.multi === !0) {
        let o = this.records.get(n);
        o || ((o = an(void 0, wo, !0)), (o.factory = () => Ts(o.multi)), this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n, r) {
      let o = _(null);
      try {
        if (n.value === iu) throw Vs(it(t));
        return (
          n.value === wo && ((n.value = iu), (n.value = n.factory(void 0, r))),
          typeof n.value == 'object' &&
            n.value &&
            vg(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        _(o);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = ae(t.providedIn);
      return typeof n == 'string'
        ? n === 'any' || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function _s(e) {
  let t = Qn(e),
    n = t !== null ? t.factory : bt(e);
  if (n !== null) return n;
  if (e instanceof y) throw new v(204, !1);
  if (e instanceof Function) return hg(e);
  throw new v(204, !1);
}
function hg(e) {
  if (e.length > 0) throw new v(204, !1);
  let n = tg(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function gg(e) {
  if (gu(e)) return an(void 0, e.useValue);
  {
    let t = mu(e);
    return an(t, wo);
  }
}
function mu(e, t, n) {
  let r;
  if (bo(e)) {
    let o = ae(e);
    return bt(o) || _s(o);
  } else if (gu(e)) r = () => ae(e.useValue);
  else if (pg(e)) r = () => e.useFactory(...Ts(e.deps || []));
  else if (fg(e)) r = (o, i) => b(ae(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
  else {
    let o = ae(e && (e.useClass || e.provide));
    if (mg(e)) r = () => new o(...Ts(e.deps));
    else return bt(o) || _s(o);
  }
  return r;
}
function qn(e) {
  if (e.destroyed) throw new v(205, !1);
}
function an(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function mg(e) {
  return !!e.deps;
}
function vg(e) {
  return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function yg(e) {
  return typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken');
}
function Ms(e, t) {
  for (let n of e) Array.isArray(n) ? Ms(n, t) : n && Ps(n) ? Ms(n.ɵproviders, t) : t(n);
}
function ee(e, t) {
  let n;
  e instanceof St ? (qn(e), (n = e)) : (n = new Ss(e));
  let r,
    o = xe(n),
    i = fe(void 0);
  try {
    return t();
  } finally {
    xe(o), fe(i);
  }
}
function vu() {
  return lu() !== void 0 || Zr() != null;
}
var be = 0,
  T = 1,
  S = 2,
  Y = 3,
  me = 4,
  ve = 5,
  Xn = 6,
  ln = 7,
  ce = 8,
  ct = 9,
  Pe = 10,
  K = 11,
  un = 12,
  Ys = 13,
  dn = 14,
  ye = 15,
  fn = 16,
  Rt = 17,
  er = 18,
  tr = 19,
  Ks = 20,
  ze = 21,
  Oo = 22,
  nr = 23,
  pe = 24,
  ko = 25,
  rr = 26,
  Ee = 27,
  yu = 1;
var lt = 7,
  or = 8,
  ir = 9,
  le = 10;
function Ge(e) {
  return Array.isArray(e) && typeof e[yu] == 'object';
}
function Se(e) {
  return Array.isArray(e) && e[yu] === !0;
}
function Js(e) {
  return (e.flags & 4) !== 0;
}
function xt(e) {
  return e.componentOffset > -1;
}
function Po(e) {
  return (e.flags & 1) === 1;
}
function At(e) {
  return !!e.template;
}
function pn(e) {
  return (e[S] & 512) !== 0;
}
function Ot(e) {
  return (e[S] & 256) === 256;
}
var Eu = 'svg',
  Iu = 'math';
function Ie(e) {
  for (; Array.isArray(e); ) e = e[be];
  return e;
}
function Xs(e, t) {
  return Ie(t[e]);
}
function Le(e, t) {
  return Ie(t[e.index]);
}
function Lo(e, t) {
  return e.data[t];
}
function Fe(e, t) {
  let n = t[e];
  return Ge(n) ? n : n[be];
}
function Fo(e) {
  return (e[S] & 128) === 128;
}
function wu(e) {
  return Se(e[Y]);
}
function sr(e, t) {
  return t == null ? null : e[t];
}
function ea(e) {
  e[Rt] = 0;
}
function ta(e) {
  e[S] & 1024 || ((e[S] |= 1024), Fo(e) && cr(e));
}
function ar(e) {
  return !!(e[S] & 9216 || e[pe]?.dirty);
}
function jo(e) {
  e[Pe].changeDetectionScheduler?.notify(8), e[S] & 64 && (e[S] |= 1024), ar(e) && cr(e);
}
function cr(e) {
  e[Pe].changeDetectionScheduler?.notify(0);
  let t = st(e);
  for (; t !== null && !(t[S] & 8192 || ((t[S] |= 8192), !Fo(t))); ) t = st(t);
}
function na(e, t) {
  if (Ot(e)) throw new v(911, !1);
  e[ze] === null && (e[ze] = []), e[ze].push(t);
}
function Du(e, t) {
  if (e[ze] === null) return;
  let n = e[ze].indexOf(t);
  n !== -1 && e[ze].splice(n, 1);
}
function st(e) {
  let t = e[Y];
  return Se(t) ? t[Y] : t;
}
function Cu(e) {
  return (e[ln] ??= []);
}
function bu(e) {
  return (e.cleanup ??= []);
}
var A = { lFrame: ju(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Ns = !1;
function Su() {
  return A.lFrame.elementDepthCount;
}
function Tu() {
  A.lFrame.elementDepthCount++;
}
function ra() {
  A.lFrame.elementDepthCount--;
}
function _u() {
  return A.bindingsEnabled;
}
function Mu() {
  return A.skipHydrationRootTNode !== null;
}
function oa(e) {
  return A.skipHydrationRootTNode === e;
}
function ia() {
  A.skipHydrationRootTNode = null;
}
function $() {
  return A.lFrame.lView;
}
function kt() {
  return A.lFrame.tView;
}
function Te() {
  let e = sa();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function sa() {
  return A.lFrame.currentTNode;
}
function Nu() {
  let e = A.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function lr(e, t) {
  let n = A.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function aa() {
  return A.lFrame.isParent;
}
function Ru() {
  A.lFrame.isParent = !1;
}
function ca() {
  return Ns;
}
function la(e) {
  let t = Ns;
  return (Ns = e), t;
}
function xu(e) {
  return (A.lFrame.bindingIndex = e);
}
function ua() {
  return A.lFrame.bindingIndex++;
}
function Au(e) {
  let t = A.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Ou() {
  return A.lFrame.inI18n;
}
function ku(e, t) {
  let n = A.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Ho(t);
}
function Pu() {
  return A.lFrame.currentDirectiveIndex;
}
function Ho(e) {
  A.lFrame.currentDirectiveIndex = e;
}
function Lu(e) {
  let t = A.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function da(e) {
  A.lFrame.currentQueryIndex = e;
}
function Eg(e) {
  let t = e[T];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[ve] : null;
}
function fa(e, t, n) {
  if (n & 4) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & 1); )
      if (((o = Eg(i)), o === null || ((i = i[dn]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (A.lFrame = Fu());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function Vo(e) {
  let t = Fu(),
    n = e[T];
  (A.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function Fu() {
  let e = A.lFrame,
    t = e === null ? null : e.child;
  return t === null ? ju(e) : t;
}
function ju(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Hu() {
  let e = A.lFrame;
  return (A.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var pa = Hu;
function Uo() {
  let e = Hu();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function Pt() {
  return A.lFrame.selectedIndex;
}
function ut(e) {
  A.lFrame.selectedIndex = e;
}
function Vu() {
  let e = A.lFrame;
  return Lo(e.tView, e.selectedIndex);
}
function Uu() {
  return A.lFrame.currentNamespace;
}
var $u = !0;
function ha() {
  return $u;
}
function ga(e) {
  $u = e;
}
function Rs(e, t = null, n = null, r) {
  let o = ma(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function ma(e, t = null, n = null, r, o = new Set()) {
  let i = [n || Ae, pu(e)];
  return (r = r || (typeof e == 'object' ? void 0 : it(e))), new St(i, t || Jn(), r || null, o);
}
var Oe = class e {
    static THROW_IF_NOT_FOUND = Dt;
    static NULL = new Wn();
    static create(t, n) {
      if (Array.isArray(t)) return Rs({ name: '' }, n, t, '');
      {
        let r = t.name ?? '';
        return Rs({ name: r }, t.parent, t.providers, r);
      }
    }
    static ɵprov = E({ token: e, providedIn: 'any', factory: () => b(zs) });
    static __NG_ELEMENT_ID__ = -1;
  },
  G = new y(''),
  Lt = (() => {
    class e {
      static __NG_ELEMENT_ID__ = Ig;
      static __NG_ENV_ID__ = (n) => n;
    }
    return e;
  })(),
  xs = class extends Lt {
    _lView;
    constructor(t) {
      super(), (this._lView = t);
    }
    get destroyed() {
      return Ot(this._lView);
    }
    onDestroy(t) {
      let n = this._lView;
      return na(n, t), () => Du(n, t);
    }
  };
function Ig() {
  return new xs($());
}
var ke = class {
    _console = console;
    handleError(t) {
      this._console.error('ERROR', t);
    }
  },
  we = new y('', {
    providedIn: 'root',
    factory: () => {
      let e = h(Q),
        t;
      return (n) => {
        e.destroyed && !t
          ? setTimeout(() => {
              throw n;
            })
          : ((t ??= e.get(ke)), t.handleError(n));
      };
    },
  }),
  Bu = { provide: qe, useValue: () => void h(ke), multi: !0 },
  wg = new y('', {
    providedIn: 'root',
    factory: () => {
      let e = h(G).defaultView;
      if (!e) return;
      let t = h(we),
        n = (i) => {
          t(i.reason), i.preventDefault();
        },
        r = (i) => {
          i.error ? t(i.error) : t(new Error(i.message, { cause: i })), i.preventDefault();
        },
        o = () => {
          e.addEventListener('unhandledrejection', n), e.addEventListener('error', r);
        };
      typeof Zone < 'u' ? Zone.root.run(o) : o(),
        h(Lt).onDestroy(() => {
          e.removeEventListener('error', r), e.removeEventListener('unhandledrejection', n);
        });
    },
  });
function va() {
  return Nt([fu(() => void h(wg))]);
}
function Ft(e, t) {
  let [n, r, o] = as(e, t?.equal),
    i = n,
    s = i[re];
  return (i.set = r), (i.update = o), (i.asReadonly = zu.bind(i)), i;
}
function zu() {
  let e = this[re];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[re] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
var Tt = class {},
  ur = new y('', { providedIn: 'root', factory: () => !1 });
var ya = new y(''),
  Ea = new y(''),
  We = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      destroyed = !1;
      pendingTask = new Z(!1);
      get hasPendingTasks() {
        return this.destroyed ? !1 : this.pendingTask.value;
      }
      get hasPendingTasksObservable() {
        return this.destroyed
          ? new x((n) => {
              n.next(!1), n.complete();
            })
          : this.pendingTask;
      }
      add() {
        !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
        let n = this.taskId++;
        return this.pendingTasks.add(n), n;
      }
      has(n) {
        return this.pendingTasks.has(n);
      }
      remove(n) {
        this.pendingTasks.delete(n),
          this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1);
      }
      ngOnDestroy() {
        this.pendingTasks.clear(),
          this.hasPendingTasks && this.pendingTask.next(!1),
          (this.destroyed = !0),
          this.pendingTask.unsubscribe();
      }
      static ɵprov = E({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })();
function dr(...e) {}
var Ia = (() => {
    class e {
      static ɵprov = E({ token: e, providedIn: 'root', factory: () => new As() });
    }
    return e;
  })(),
  As = class {
    dirtyEffectCount = 0;
    queues = new Map();
    add(t) {
      this.enqueue(t), this.schedule(t);
    }
    schedule(t) {
      t.dirty && this.dirtyEffectCount++;
    }
    remove(t) {
      let n = t.zone,
        r = this.queues.get(n);
      r.has(t) && (r.delete(t), t.dirty && this.dirtyEffectCount--);
    }
    enqueue(t) {
      let n = t.zone;
      this.queues.has(n) || this.queues.set(n, new Set());
      let r = this.queues.get(n);
      r.has(t) || r.add(t);
    }
    flush() {
      for (; this.dirtyEffectCount > 0; ) {
        let t = !1;
        for (let [n, r] of this.queues)
          n === null ? (t ||= this.flushQueue(r)) : (t ||= n.run(() => this.flushQueue(r)));
        t || (this.dirtyEffectCount = 0);
      }
    }
    flushQueue(t) {
      let n = !1;
      for (let r of t) r.dirty && (this.dirtyEffectCount--, (n = !0), r.run());
      return n;
    }
  };
function ai(e) {
  return { toString: e }.toString();
}
function Pg(e) {
  return typeof e == 'function';
}
var Go = class {
  previousValue;
  currentValue;
  firstChange;
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Dd(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
var Wa = (() => {
  let e = () => Cd;
  return (e.ngInherit = !0), e;
})();
function Cd(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = Fg), Lg;
}
function Lg() {
  let e = Sd(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Mt) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function Fg(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = Sd(e) || jg(e, { previous: Mt, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  (a[i] = new Go(l && l.currentValue, n, c === Mt)), Dd(e, t, o, n);
}
var bd = '__ngSimpleChanges__';
function Sd(e) {
  return e[bd] || null;
}
function jg(e, t) {
  return (e[bd] = t);
}
var qu = [];
var F = function (e, t = null, n) {
  for (let r = 0; r < qu.length; r++) {
    let o = qu[r];
    o(e, t, n);
  }
};
function Hg(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = Cd(t);
    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i));
}
function Vg(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      l && ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)),
      u != null && (e.destroyHooks ??= []).push(n, u);
  }
}
function Bo(e, t, n) {
  Td(e, t, 3, n);
}
function zo(e, t, n, r) {
  (e[S] & 3) === n && Td(e, t, n, r);
}
function wa(e, t) {
  let n = e[S];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[S] = n));
}
function Td(e, t, n, r) {
  let o = r !== void 0 ? e[Rt] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == 'number') {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[Rt] += 65536),
        (a < i || i == -1) && (Ug(e, n, t, c), (e[Rt] = (e[Rt] & 4294901760) + c + 2)),
        c++;
}
function Gu(e, t) {
  F(4, e, t);
  let n = _(null);
  try {
    t.call(e);
  } finally {
    _(n), F(5, e, t);
  }
}
function Ug(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o ? e[S] >> 14 < e[Rt] >> 16 && (e[S] & 3) === t && ((e[S] += 16384), Gu(a, i)) : Gu(a, i);
}
var gn = -1,
  hr = class {
    factory;
    name;
    injectImpl;
    resolving = !1;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(t, n, r, o) {
      (this.factory = t), (this.name = o), (this.canSeeViewProviders = n), (this.injectImpl = r);
    }
  };
function $g(e) {
  return (e.flags & 8) !== 0;
}
function Bg(e) {
  return (e.flags & 16) !== 0;
}
function zg(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == 'number') {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      Gg(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function qg(e) {
  return e === 3 || e === 4 || e === 6;
}
function Gg(e) {
  return e.charCodeAt(0) === 64;
}
function Za(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == 'number'
          ? (n = o)
          : n === 0 || (n === -1 || n === 2 ? Wu(e, n, o, null, t[++r]) : Wu(e, n, o, null, null));
      }
    }
  return e;
}
function Wu(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == 'number') {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == 'number') break;
    if (a === n) {
      o !== null && (e[i + 1] = o);
      return;
    }
    i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    o !== null && e.splice(i++, 0, o);
}
function _d(e) {
  return e !== gn;
}
function Wo(e) {
  return e & 32767;
}
function Wg(e) {
  return e >> 16;
}
function Zo(e, t) {
  let n = Wg(e),
    r = t;
  for (; n > 0; ) (r = r[dn]), n--;
  return r;
}
var _a = !0;
function Zu(e) {
  let t = _a;
  return (_a = e), t;
}
var Zg = 256,
  Md = Zg - 1,
  Nd = 5,
  Qg = 0,
  je = {};
function Yg(e, t, n) {
  let r;
  typeof n == 'string' ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(_t) && (r = n[_t]),
    r == null && (r = n[_t] = Qg++);
  let o = r & Md,
    i = 1 << o;
  t.data[e + (o >> Nd)] |= i;
}
function Rd(e, t) {
  let n = xd(e, t);
  if (n !== -1) return n;
  let r = t[T];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length), Da(r.data, e), Da(t, null), Da(r.blueprint, null));
  let o = Qa(e, t),
    i = e.injectorIndex;
  if (_d(o)) {
    let s = Wo(o),
      a = Zo(o, t),
      c = a[T].data;
    for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l];
  }
  return (t[i + 8] = o), i;
}
function Da(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function xd(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Qa(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = Ld(o)), r === null)) return gn;
    if ((n++, (o = o[dn]), r.injectorIndex !== -1)) return r.injectorIndex | (n << 16);
  }
  return gn;
}
function Kg(e, t, n) {
  Yg(e, t, n);
}
function Ad(e, t, n) {
  if (n & 8 || e !== void 0) return e;
  Ro(t, 'NodeInjector');
}
function Od(e, t, n, r) {
  if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
    let o = e[ct],
      i = fe(void 0);
    try {
      return o ? o.get(t, r, n & 8) : Us(t, r, n & 8);
    } finally {
      fe(i);
    }
  }
  return Ad(r, t, n);
}
function kd(e, t, n, r = 0, o) {
  if (e !== null) {
    if (t[S] & 2048 && !(r & 2)) {
      let s = nm(e, t, n, r, je);
      if (s !== je) return s;
    }
    let i = Pd(e, t, n, r, je);
    if (i !== je) return i;
  }
  return Od(t, n, r, o);
}
function Pd(e, t, n, r, o) {
  let i = em(n);
  if (typeof i == 'function') {
    if (!fa(t, e, r)) return r & 1 ? Ad(o, n, r) : Od(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & 8))) Ro(n);
      else return s;
    } finally {
      pa();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = xd(e, t),
      c = gn,
      l = r & 1 ? t[ye][ve] : null;
    for (
      (a === -1 || r & 4) &&
      ((c = a === -1 ? Qa(e, t) : t[a + 8]),
      c === gn || !Yu(r, !1) ? (a = -1) : ((s = t[T]), (a = Wo(c)), (t = Zo(c, t))));
      a !== -1;

    ) {
      let u = t[T];
      if (Qu(i, a, u.data)) {
        let d = Jg(a, t, n, s, r, l);
        if (d !== je) return d;
      }
      (c = t[a + 8]),
        c !== gn && Yu(r, t[T].data[a + 8] === l) && Qu(i, a, t)
          ? ((s = u), (a = Wo(c)), (t = Zo(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function Jg(e, t, n, r, o, i) {
  let s = t[T],
    a = s.data[e + 8],
    c = r == null ? xt(a) && _a : r != s && (a.type & 3) !== 0,
    l = o & 1 && i === a,
    u = Xg(a, s, n, c, l);
  return u !== null ? Ma(t, s, u, a, o) : je;
}
function Xg(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    l = e.directiveEnd,
    u = i >> 20,
    d = r ? a : a + u,
    p = o ? a + u : l;
  for (let f = d; f < p; f++) {
    let m = s[f];
    if ((f < c && n === m) || (f >= c && m.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && At(f) && f.type === n) return c;
  }
  return null;
}
function Ma(e, t, n, r, o) {
  let i = e[n],
    s = t.data;
  if (i instanceof hr) {
    let a = i;
    if (a.resolving) {
      let f = su(s[n]);
      throw Vs(f);
    }
    let c = Zu(a.canSeeViewProviders);
    a.resolving = !0;
    let l = s[n].type || s[n],
      u,
      d = a.injectImpl ? fe(a.injectImpl) : null,
      p = fa(e, r, 0);
    try {
      (i = e[n] = a.factory(void 0, o, s, e, r)),
        t.firstCreatePass && n >= r.directiveStart && Hg(n, s[n], t);
    } finally {
      d !== null && fe(d), Zu(c), (a.resolving = !1), pa();
    }
  }
  return i;
}
function em(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(_t) ? e[_t] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & Md : tm) : t;
}
function Qu(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> Nd)] & r);
}
function Yu(e, t) {
  return !(e & 2) && !(e & 1 && t);
}
var jt = class {
  _tNode;
  _lView;
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return kd(this._tNode, this._lView, t, Ct(r), n);
  }
};
function tm() {
  return new jt(Te(), $());
}
function ci(e) {
  return ai(() => {
    let t = e.prototype.constructor,
      n = t[Gn] || Na(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Gn] || Na(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function Na(e) {
  return Os(e)
    ? () => {
        let t = Na(ae(e));
        return t && t();
      }
    : bt(e);
}
function nm(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[S] & 2048 && !pn(s); ) {
    let a = Pd(i, s, n, r | 2, je);
    if (a !== je) return a;
    let c = i.parent;
    if (!c) {
      let l = s[Ks];
      if (l) {
        let u = l.get(n, je, r);
        if (u !== je) return u;
      }
      (c = Ld(s)), (s = s[dn]);
    }
    i = c;
  }
  return o;
}
function Ld(e) {
  let t = e[T],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[ve] : null;
}
function rm() {
  return Ya(Te(), $());
}
function Ya(e, t) {
  return new Fd(Le(e, t));
}
var Fd = (() => {
  class e {
    nativeElement;
    constructor(n) {
      this.nativeElement = n;
    }
    static __NG_ELEMENT_ID__ = rm;
  }
  return e;
})();
function jd(e) {
  return (e.flags & 128) === 128;
}
var Ka = (function (e) {
    return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
  })(Ka || {}),
  Hd = new Map(),
  om = 0;
function im() {
  return om++;
}
function sm(e) {
  Hd.set(e[tr], e);
}
function Ra(e) {
  Hd.delete(e[tr]);
}
var Ku = '__ngContext__';
function gr(e, t) {
  Ge(t) ? ((e[Ku] = t[tr]), sm(t)) : (e[Ku] = t);
}
function Vd(e) {
  return $d(e[un]);
}
function Ud(e) {
  return $d(e[me]);
}
function $d(e) {
  for (; e !== null && !Se(e); ) e = e[me];
  return e;
}
var xa;
function Ja(e) {
  xa = e;
}
function Bd() {
  if (xa !== void 0) return xa;
  if (typeof document < 'u') return document;
  throw new v(210, !1);
}
var li = new y('', { providedIn: 'root', factory: () => am }),
  am = 'ng',
  ui = new y(''),
  In = new y('', { providedIn: 'platform', factory: () => 'unknown' });
var di = new y('', {
  providedIn: 'root',
  factory: () => Bd().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
});
var cm = 'h',
  lm = 'b';
var zd = !1,
  qd = new y('', { providedIn: 'root', factory: () => zd });
var um = (e, t, n, r) => {};
function dm(e, t, n, r) {
  um(e, t, n, r);
}
function Xa(e) {
  return (e.flags & 32) === 32;
}
var fm = () => null;
function Gd(e, t, n = !1) {
  return fm(e, t, n);
}
function Wd(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = _(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          da(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      _(r);
    }
  }
}
function Aa(e, t, n) {
  da(0);
  let r = _(null);
  try {
    t(e, n);
  } finally {
    _(r);
  }
}
function Zd(e, t, n) {
  if (Js(t)) {
    let r = _(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      _(r);
    }
  }
}
var Ze = (function (e) {
  return (
    (e[(e.Emulated = 0)] = 'Emulated'),
    (e[(e.None = 2)] = 'None'),
    (e[(e.ShadowDom = 3)] = 'ShadowDom'),
    e
  );
})(Ze || {});
var Qo = class {
  changingThisBreaksApplicationSecurity;
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${So})`;
  }
};
function fi(e) {
  return e instanceof Qo ? e.changingThisBreaksApplicationSecurity : e;
}
function Qd(e, t) {
  let n = Yd(e);
  if (n != null && n !== t) {
    if (n === 'ResourceURL' && t === 'URL') return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${So})`);
  }
  return n === t;
}
function Yd(e) {
  return (e instanceof Qo && e.getTypeName()) || null;
}
var pm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Kd(e) {
  return (e = String(e)), e.match(pm) ? e : 'unsafe:' + e;
}
var ec = (function (e) {
  return (
    (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.HTML = 1)] = 'HTML'),
    (e[(e.STYLE = 2)] = 'STYLE'),
    (e[(e.SCRIPT = 3)] = 'SCRIPT'),
    (e[(e.URL = 4)] = 'URL'),
    (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    e
  );
})(ec || {});
function tc(e) {
  let t = hm();
  return t ? t.sanitize(ec.URL, e) || '' : Qd(e, 'URL') ? fi(e) : Kd(No(e));
}
function hm() {
  let e = $();
  return e && e[Pe].sanitizer;
}
function Jd(e) {
  return e instanceof Function ? e() : e;
}
function gm(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
var Xd = 'ng-template';
function mm(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == 'string'; o += 2)
      if (t[o] === 'class' && gm(t[o + 1].toLowerCase(), n, 0) !== -1) return !0;
  } else if (nc(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == 'string'; ) if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function nc(e) {
  return e.type === 4 && e.value !== Xd;
}
function vm(e, t, n) {
  let r = e.type === 4 && !n ? Xd : e.value;
  return t === r;
}
function ym(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? wm(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == 'number') {
      if (!s && !_e(r) && !_e(c)) return !1;
      if (s && _e(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (((r = 2 | (r & 1)), (c !== '' && !vm(e, c, n)) || (c === '' && t.length === 1))) {
          if (_e(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !mm(e, o, c, n)) {
          if (_e(r)) return !1;
          s = !0;
        }
      } else {
        let l = t[++a],
          u = Em(c, o, nc(e), n);
        if (u === -1) {
          if (_e(r)) return !1;
          s = !0;
          continue;
        }
        if (l !== '') {
          let d;
          if ((u > i ? (d = '') : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)) {
            if (_e(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return _e(r) || s;
}
function _e(e) {
  return (e & 1) === 0;
}
function Em(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == 'string'; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return Dm(t, e);
}
function Im(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (ym(e, t[r], n)) return !0;
  return !1;
}
function wm(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (qg(n)) return t;
  }
  return e.length;
}
function Dm(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == 'number') return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function Ju(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function Cm(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = '',
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == 'string')
      if (r & 2) {
        let a = e[++n];
        o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
    else o !== '' && !_e(s) && ((t += Ju(i, o)), (o = '')), (r = s), (i = i || !_e(r));
    n++;
  }
  return o !== '' && (t += Ju(i, o)), t;
}
function bm(e) {
  return e.map(Cm).join(',');
}
function Sm(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string') o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!_e(o)) break;
      o = i;
    }
    r++;
  }
  return n.length && t.push(1, ...n), t;
}
var Ye = {};
function Tm(e, t) {
  return e.createText(t);
}
function _m(e, t, n) {
  e.setValue(t, n);
}
function ef(e, t, n) {
  return e.createElement(t, n);
}
function Yo(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function tf(e, t, n) {
  e.appendChild(t, n);
}
function Xu(e, t, n, r, o) {
  r !== null ? Yo(e, t, n, r, o) : tf(e, t, n);
}
function Mm(e, t, n, r) {
  e.removeChild(null, t, n, r);
}
function Nm(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function Rm(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function nf(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && zg(e, t, r), o !== null && Rm(e, t, o), i !== null && Nm(e, t, i);
}
function rf(e, t, n, r, o, i, s, a, c, l, u) {
  let d = Ee + r,
    p = d + o,
    f = xm(d, p),
    m = typeof l == 'function' ? l() : l;
  return (f[T] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: p,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == 'function' ? i() : i,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: c,
    consts: m,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function xm(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : Ye);
  return n;
}
function Am(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = rf(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function of(e, t, n, r, o, i, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[be] = o),
    (d[S] = r | 4 | 128 | 8 | 64 | 1024),
    (l !== null || (e && e[S] & 2048)) && (d[S] |= 2048),
    ea(d),
    (d[Y] = d[dn] = e),
    (d[ce] = n),
    (d[Pe] = s || (e && e[Pe])),
    (d[K] = a || (e && e[K])),
    (d[ct] = c || (e && e[ct]) || null),
    (d[ve] = i),
    (d[tr] = im()),
    (d[Xn] = u),
    (d[Ks] = l),
    (d[ye] = t.type == 2 ? e[ye] : d),
    d
  );
}
function Om(e, t, n) {
  let r = Le(t, e),
    o = Am(n),
    i = e[Pe].rendererFactory,
    s = cf(e, of(e, o, null, sf(n), r, t, null, i.createRenderer(r, n), null, null, null));
  return (e[t.index] = s);
}
function sf(e) {
  let t = 16;
  return e.signals ? (t = 4096) : e.onPush && (t = 64), t;
}
function af(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function cf(e, t) {
  return e[un] ? (e[Ys][me] = t) : (e[un] = t), (e[Ys] = t), t;
}
function wn(e = 1) {
  lf(kt(), $(), Pt() + e, !1);
}
function lf(e, t, n, r) {
  if (!r)
    if ((t[S] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && Bo(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && zo(t, i, 0, n);
    }
  ut(n);
}
var pi = (function (e) {
  return (
    (e[(e.None = 0)] = 'None'),
    (e[(e.SignalBased = 1)] = 'SignalBased'),
    (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
    e
  );
})(pi || {});
function Oa(e, t, n, r) {
  let o = _(null);
  try {
    let [i, s, a] = e.inputs[n],
      c = null;
    (s & pi.SignalBased) !== 0 && (c = t[i][re]),
      c !== null && c.transformFn !== void 0
        ? (r = c.transformFn(r))
        : a !== null && (r = a.call(t, r)),
      e.setInput !== null ? e.setInput(t, c, r, n, i) : Dd(t, c, i, r);
  } finally {
    _(o);
  }
}
var Qe = (function (e) {
    return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e;
  })(Qe || {}),
  km;
function rc(e, t) {
  return km(e, t);
}
var mn = new Set(),
  oc = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
      (e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
      e
    );
  })(oc || {}),
  Er = new y(''),
  ed = new Set();
function hi(e) {
  ed.has(e) || (ed.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var uf = !1,
  ka = class extends W {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(t = !1) {
      super(),
        (this.__isAsync = t),
        vu() &&
          ((this.destroyRef = h(Lt, { optional: !0 }) ?? void 0),
          (this.pendingTasks = h(We, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = _(null);
      try {
        super.next(t);
      } finally {
        _(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == 'object') {
        let c = t;
        (o = c.next?.bind(c)), (i = c.error?.bind(c)), (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof H && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          try {
            t(n);
          } finally {
            r !== void 0 && this.pendingTasks?.remove(r);
          }
        });
      };
    }
  },
  ne = ka;
function df(e) {
  let t, n;
  function r() {
    e = dr;
    try {
      n !== void 0 && typeof cancelAnimationFrame == 'function' && cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == 'function' &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function td(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = dr;
    }
  );
}
var ic = 'isAngularZone',
  Ko = ic + '_ID',
  Pm = 0,
  B = class e {
    hasPendingMacrotasks = !1;
    hasPendingMicrotasks = !1;
    isStable = !0;
    onUnstable = new ne(!1);
    onMicrotaskEmpty = new ne(!1);
    onStable = new ne(!1);
    onError = new ne(!1);
    constructor(t) {
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = uf,
      } = t;
      if (typeof Zone > 'u') throw new v(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        jm(s);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(ic) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new v(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new v(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, Lm, dr, dr);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  Lm = {};
function sc(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function Fm(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    df(() => {
      (e.callbackScheduled = !1),
        Pa(e),
        (e.isCheckStableRunning = !0),
        sc(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    Pa(e);
}
function jm(e) {
  let t = () => {
      Fm(e);
    },
    n = Pm++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [ic]: !0, [Ko]: n, [Ko + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (Hm(c)) return r.invokeTask(i, s, a, c);
      try {
        return nd(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          rd(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return nd(e), r.invoke(i, s, a, c, l);
      } finally {
        e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Vm(c) && t(), rd(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), Pa(e), sc(e))
            : s.change == 'macroTask' && (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function Pa(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function nd(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function rd(e) {
  e._nesting--, sc(e);
}
var Jo = class {
  hasPendingMicrotasks = !1;
  hasPendingMacrotasks = !1;
  isStable = !0;
  onUnstable = new ne();
  onMicrotaskEmpty = new ne();
  onStable = new ne();
  onError = new ne();
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function Hm(e) {
  return ff(e, '__ignore_ng_zone__');
}
function Vm(e) {
  return ff(e, '__scheduler_tick__');
}
function ff(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var pf = (() => {
  class e {
    impl = null;
    execute() {
      this.impl?.execute();
    }
    static ɵprov = E({ token: e, providedIn: 'root', factory: () => new e() });
  }
  return e;
})();
var Um = new y('', {
  providedIn: 'root',
  factory: () => ({ queue: new Set(), isScheduled: !1, scheduler: null }),
});
function hf(e, t) {
  let n = e.get(Um);
  if (Array.isArray(t)) for (let r of t) n.queue.add(r);
  else n.queue.add(t);
  n.scheduler && n.scheduler(e);
}
function $m(e, t) {
  for (let [n, r] of t) hf(e, r.animateFns);
}
function od(e, t, n, r) {
  let o = e?.[rr]?.enter;
  t !== null && o && o.has(n.index) && $m(r, o);
}
function hn(e, t, n, r, o, i, s, a) {
  if (o != null) {
    let c,
      l = !1;
    Se(o) ? (c = o) : Ge(o) && ((l = !0), (o = o[be]));
    let u = Ie(o);
    e === 0 && r !== null
      ? (od(a, r, i, n), s == null ? tf(t, r, u) : Yo(t, r, u, s || null, !0))
      : e === 1 && r !== null
      ? (od(a, r, i, n), Yo(t, r, u, s || null, !0))
      : e === 2
      ? id(a, i, n, (d) => {
          Mm(t, u, l, d);
        })
      : e === 3 &&
        id(a, i, n, () => {
          t.destroyNode(u);
        }),
      c != null && tv(t, e, n, c, i, r, s);
  }
}
function Bm(e, t) {
  gf(e, t), (t[be] = null), (t[ve] = null);
}
function zm(e, t, n, r, o, i) {
  (r[be] = o), (r[ve] = t), gi(e, r, n, 1, o, i);
}
function gf(e, t) {
  t[Pe].changeDetectionScheduler?.notify(9), gi(e, t, t[K], 2, null, null);
}
function qm(e) {
  let t = e[un];
  if (!t) return Ca(e[T], e);
  for (; t; ) {
    let n = null;
    if (Ge(t)) n = t[un];
    else {
      let r = t[le];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[me] && t !== e; ) Ge(t) && Ca(t[T], t), (t = t[Y]);
      t === null && (t = e), Ge(t) && Ca(t[T], t), (n = t && t[me]);
    }
    t = n;
  }
}
function ac(e, t) {
  let n = e[ir],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function mf(e, t) {
  if (Ot(t)) return;
  let n = t[K];
  n.destroyNode && gi(e, t, n, 3, null, null), qm(t);
}
function Ca(e, t) {
  if (Ot(t)) return;
  let n = _(null);
  try {
    (t[S] &= -129),
      (t[S] |= 256),
      t[pe] && Vn(t[pe]),
      Zm(e, t),
      Wm(e, t),
      t[T].type === 1 && t[K].destroy();
    let r = t[fn];
    if (r !== null && Se(t[Y])) {
      r !== t[Y] && ac(r, t);
      let o = t[er];
      o !== null && o.detachView(e);
    }
    Ra(t);
  } finally {
    _(n);
  }
}
function id(e, t, n, r) {
  let o = e?.[rr];
  if (o == null || o.leave == null || !o.leave.has(t.index)) return r(!1);
  if (o.skipLeaveAnimations) return (o.skipLeaveAnimations = !1), r(!1);
  e && mn.add(e),
    hf(n, () => {
      if (o.leave && o.leave.has(t.index)) {
        let s = o.leave.get(t.index),
          a = [];
        if (s)
          for (let c = 0; c < s.animateFns.length; c++) {
            let l = s.animateFns[c],
              { promise: u } = l();
            a.push(u);
          }
        (o.running = Promise.allSettled(a)), Gm(e, r);
      } else e && mn.delete(e), r(!1);
    });
}
function Gm(e, t) {
  let n = e[rr]?.running;
  if (n) {
    n.then(() => {
      (e[rr].running = void 0), mn.delete(e), t(!0);
    });
    return;
  }
  t(!1);
}
function Wm(e, t) {
  let n = e.cleanup,
    r = t[ln];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == 'string') {
        let a = n[s + 3];
        a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2);
      } else {
        let a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[ln] = null);
  let o = t[ze];
  if (o !== null) {
    t[ze] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = t[nr];
  if (i !== null) {
    t[nr] = null;
    for (let s of i) s.destroy();
  }
}
function Zm(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof hr)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            F(4, a, c);
            try {
              c.call(a);
            } finally {
              F(5, a, c);
            }
          }
        else {
          F(4, o, i);
          try {
            i.call(o);
          } finally {
            F(5, o, i);
          }
        }
      }
    }
}
function Qm(e, t, n) {
  return Ym(e, t.parent, n);
}
function Ym(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[be];
  if (xt(r)) {
    let { encapsulation: o } = e.data[r.directiveStart + r.componentOffset];
    if (o === Ze.None || o === Ze.Emulated) return null;
  }
  return Le(r, n);
}
function Km(e, t, n) {
  return Xm(e, t, n);
}
function Jm(e, t, n) {
  return e.type & 40 ? Le(e, n) : null;
}
var Xm = Jm,
  sd;
function vf(e, t, n, r) {
  let o = Qm(e, r, t),
    i = t[K],
    s = r.parent || t[ve],
    a = Km(s, r, t);
  if (o != null)
    if (Array.isArray(n)) for (let c = 0; c < n.length; c++) Xu(i, o, n[c], a, !1);
    else Xu(i, o, n, a, !1);
  sd !== void 0 && sd(i, r, t, n, o);
}
function fr(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return Le(t, e);
    if (n & 4) return La(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return fr(e, r);
      {
        let o = e[t.index];
        return Se(o) ? La(-1, o) : Ie(o);
      }
    } else {
      if (n & 128) return fr(e, t.next);
      if (n & 32) return rc(t, e)() || Ie(e[t.index]);
      {
        let r = yf(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = st(e[ye]);
          return fr(o, r);
        } else return fr(e, t.next);
      }
    }
  }
  return null;
}
function yf(e, t) {
  if (t !== null) {
    let r = e[ye][ve],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function La(e, t) {
  let n = le + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[T].firstChild;
    if (o !== null) return fr(r, o);
  }
  return t[lt];
}
function cc(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    let a = r[ct];
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let c = r[n.index],
      l = n.type;
    if ((s && t === 0 && (c && gr(Ie(c), r), (n.flags |= 2)), !Xa(n)))
      if (l & 8) cc(e, t, n.child, r, o, i, !1), hn(t, e, a, o, c, n, i, r);
      else if (l & 32) {
        let u = rc(n, r),
          d;
        for (; (d = u()); ) hn(t, e, a, o, d, n, i, r);
        hn(t, e, a, o, c, n, i, r);
      } else l & 16 ? ev(e, t, r, n, o, i) : hn(t, e, a, o, c, n, i, r);
    n = s ? n.projectionNext : n.next;
  }
}
function gi(e, t, n, r, o, i) {
  cc(n, r, e.firstChild, t, o, i, !1);
}
function ev(e, t, n, r, o, i) {
  let s = n[ye],
    c = s[ve].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      hn(t, e, n[ct], o, u, r, i, n);
    }
  else {
    let l = c,
      u = s[Y];
    jd(r) && (l.flags |= 128), cc(e, t, l, u, o, i, !0);
  }
}
function tv(e, t, n, r, o, i, s) {
  let a = r[lt],
    c = Ie(r);
  a !== c && hn(t, e, n, i, a, o, s);
  for (let l = le; l < r.length; l++) {
    let u = r[l];
    gi(u[T], u, e, t, i, a);
  }
}
function nv(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf('-') === -1 ? void 0 : Qe.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == 'string' &&
          o.endsWith('!important') &&
          ((o = o.slice(0, -10)), (i |= Qe.Important)),
        e.setStyle(n, r, o, i));
  }
}
function Ef(e, t, n, r, o) {
  let i = Pt(),
    s = r & 2;
  try {
    ut(-1), s && t.length > Ee && lf(e, t, Ee, !1), F(s ? 2 : 0, o, n), n(r, o);
  } finally {
    ut(i), F(s ? 3 : 1, o, n);
  }
}
function If(e, t, n) {
  av(e, t, n), (n.flags & 64) === 64 && cv(e, t, n);
}
function wf(e, t, n = Le) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function rv(e, t, n, r) {
  let i = r.get(qd, zd) || n === Ze.ShadowDom,
    s = e.selectRootElement(t, i);
  return ov(s), s;
}
function ov(e) {
  iv(e);
}
var iv = () => null;
function sv(e, t, n, r, o, i) {
  if (e.type & 3) {
    let s = Le(e, t);
    (r = i != null ? i(r, e.value || '', n) : r), o.setProperty(s, n, r);
  } else e.type & 12;
}
function av(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd;
  xt(n) && Om(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || Rd(n, t);
  let i = n.initialInputs;
  for (let s = r; s < o; s++) {
    let a = e.data[s],
      c = Ma(t, e, s, n);
    if ((gr(c, t), i !== null && dv(t, s - r, c, a, n, i), At(a))) {
      let l = Fe(n.index, t);
      l[ce] = Ma(t, e, s, n);
    }
  }
}
function cv(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Pu();
  try {
    ut(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = t[a];
      Ho(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && lv(c, l);
    }
  } finally {
    ut(-1), Ho(s);
  }
}
function lv(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function uv(e, t) {
  let n = e.directiveRegistry,
    r = null;
  if (n)
    for (let o = 0; o < n.length; o++) {
      let i = n[o];
      Im(t, i.selectors, !1) && ((r ??= []), At(i) ? r.unshift(i) : r.push(i));
    }
  return r;
}
function dv(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a],
        l = s[a + 1];
      Oa(r, n, c, l);
    }
}
function Df(e, t, n, r, o) {
  let i = Ee + n,
    s = t[T],
    a = o(s, t, e, r, n);
  (t[i] = a), lr(e, !0);
  let c = e.type === 2;
  return (
    c ? (nf(t[K], a, e), (Su() === 0 || Po(e)) && gr(a, t), Tu()) : gr(a, t),
    ha() && (!c || !Xa(e)) && vf(s, t, a, e),
    e
  );
}
function Cf(e) {
  let t = e;
  return aa() ? Ru() : ((t = t.parent), lr(t, !1)), t;
}
function fv(e, t) {
  let n = e[ct];
  if (!n) return;
  let r;
  try {
    r = n.get(we, null);
  } catch {
    r = null;
  }
  r?.(t);
}
function bf(e, t, n, r, o) {
  let i = e.inputs?.[r],
    s = e.hostDirectiveInputs?.[r],
    a = !1;
  if (s)
    for (let c = 0; c < s.length; c += 2) {
      let l = s[c],
        u = s[c + 1],
        d = t.data[l];
      Oa(d, n[l], u, o), (a = !0);
    }
  if (i)
    for (let c of i) {
      let l = n[c],
        u = t.data[c];
      Oa(u, l, r, o), (a = !0);
    }
  return a;
}
function pv(e, t) {
  let n = Fe(t, e),
    r = n[T];
  hv(r, n);
  let o = n[be];
  o !== null && n[Xn] === null && (n[Xn] = Gd(o, n[ct])), F(18), Sf(r, n, n[ce]), F(19, n[ce]);
}
function hv(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Sf(e, t, n) {
  Vo(t);
  try {
    let r = e.viewQuery;
    r !== null && Aa(1, r, n);
    let o = e.template;
    o !== null && Ef(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[er]?.finishViewCreation(e),
      e.staticContentQueries && Wd(e, t),
      e.staticViewQueries && Aa(2, e.viewQuery, n);
    let i = e.components;
    i !== null && gv(t, i);
  } catch (r) {
    throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
  } finally {
    (t[S] &= -5), Uo();
  }
}
function gv(e, t) {
  for (let n = 0; n < t.length; n++) pv(e, t[n]);
}
function ad(e, t) {
  return !t || t.firstChild === null || jd(e);
}
function mr(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(Ie(i)), Se(i) && Tf(i, r);
    let s = n.type;
    if (s & 8) mr(e, t, n.child, r);
    else if (s & 32) {
      let a = rc(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = yf(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = st(t[ye]);
        mr(c[T], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function Tf(e, t) {
  for (let n = le; n < e.length; n++) {
    let r = e[n],
      o = r[T].firstChild;
    o !== null && mr(r[T], r, o, t);
  }
  e[lt] !== e[be] && t.push(e[lt]);
}
function _f(e) {
  if (e[ko] !== null) {
    for (let t of e[ko]) t.impl.addSequence(t);
    e[ko].length = 0;
  }
}
var Mf = [];
function mv(e) {
  return e[pe] ?? vv(e);
}
function vv(e) {
  let t = Mf.pop() ?? Object.create(Ev);
  return (t.lView = e), t;
}
function yv(e) {
  e.lView[pe] !== e && ((e.lView = null), Mf.push(e));
}
var Ev = j(g({}, Ln), {
  consumerIsAlwaysLive: !0,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    cr(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[pe] = this;
  },
});
function Iv(e) {
  let t = e[pe] ?? Object.create(wv);
  return (t.lView = e), t;
}
var wv = j(g({}, Ln), {
  consumerIsAlwaysLive: !0,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    let t = st(e.lView);
    for (; t && !Nf(t[T]); ) t = st(t);
    t && ta(t);
  },
  consumerOnSignalRead() {
    this.lView[pe] = this;
  },
});
function Nf(e) {
  return e.type !== 2;
}
function Rf(e) {
  if (e[nr] === null) return;
  let t = !0;
  for (; t; ) {
    let n = !1;
    for (let r of e[nr])
      r.dirty &&
        ((n = !0),
        r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
    t = n && !!(e[S] & 8192);
  }
}
var Dv = 100;
function xf(e, t = 0) {
  let r = e[Pe].rendererFactory,
    o = !1;
  o || r.begin?.();
  try {
    Cv(e, t);
  } finally {
    o || r.end?.();
  }
}
function Cv(e, t) {
  let n = ca();
  try {
    la(!0), Fa(e, t);
    let r = 0;
    for (; ar(e); ) {
      if (r === Dv) throw new v(103, !1);
      r++, Fa(e, 1);
    }
  } finally {
    la(n);
  }
}
function bv(e, t, n, r) {
  if (Ot(t)) return;
  let o = t[S],
    i = !1,
    s = !1;
  Vo(t);
  let a = !0,
    c = null,
    l = null;
  i ||
    (Nf(e)
      ? ((l = mv(t)), (c = jn(l)))
      : Kr() === null
      ? ((a = !1), (l = Iv(t)), (c = jn(l)))
      : t[pe] && (Vn(t[pe]), (t[pe] = null)));
  try {
    ea(t), xu(e.bindingStartIndex), n !== null && Ef(e, t, n, 2, r);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && Bo(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && zo(t, f, 0, null), wa(t, 0);
      }
    if ((s || Sv(t), Rf(t), Af(t, 0), e.contentQueries !== null && Wd(e, t), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && Bo(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && zo(t, f, 1), wa(t, 1);
      }
    _v(e, t);
    let d = e.components;
    d !== null && kf(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && Aa(2, p, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && Bo(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && zo(t, f, 2), wa(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Oo])) {
      for (let f of t[Oo]) f();
      t[Oo] = null;
    }
    i || (_f(t), (t[S] &= -73));
  } catch (u) {
    throw (i || cr(t), u);
  } finally {
    l !== null && (Jr(l, c), a && yv(l)), Uo();
  }
}
function Af(e, t) {
  for (let n = Vd(e); n !== null; n = Ud(n))
    for (let r = le; r < n.length; r++) {
      let o = n[r];
      Of(o, t);
    }
}
function Sv(e) {
  for (let t = Vd(e); t !== null; t = Ud(t)) {
    if (!(t[S] & 2)) continue;
    let n = t[ir];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      ta(o);
    }
  }
}
function Tv(e, t, n) {
  F(18);
  let r = Fe(t, e);
  Of(r, n), F(19, r[ce]);
}
function Of(e, t) {
  Fo(e) && Fa(e, t);
}
function Fa(e, t) {
  let r = e[T],
    o = e[S],
    i = e[pe],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && Hn(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[S] &= -9217),
    s)
  )
    bv(r, e, r.template, e[ce]);
  else if (o & 8192) {
    let a = _(null);
    try {
      Rf(e), Af(e, 1);
      let c = r.components;
      c !== null && kf(e, c, 1), _f(e);
    } finally {
      _(a);
    }
  }
}
function kf(e, t, n) {
  for (let r = 0; r < t.length; r++) Tv(e, t[r], n);
}
function _v(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) ut(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          ku(s, i);
          let c = t[i];
          F(24, c), a(2, c), F(25, c);
        }
      }
    } finally {
      ut(-1);
    }
}
function lc(e, t) {
  let n = ca() ? 64 : 1088;
  for (e[Pe].changeDetectionScheduler?.notify(t); e; ) {
    e[S] |= n;
    let r = st(e);
    if (pn(e) && !r) return e;
    e = r;
  }
  return null;
}
function Mv(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function Nv(e, t, n, r = !0) {
  let o = t[T];
  if ((Rv(o, t, e, n), r)) {
    let s = La(n, e),
      a = t[K],
      c = a.parentNode(e[lt]);
    c !== null && zm(o, e[ve], a, t, c, s);
  }
  let i = t[Xn];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ja(e, t) {
  if (e.length <= le) return;
  let n = le + t,
    r = e[n];
  if (r) {
    let o = r[fn];
    o !== null && o !== e && ac(o, r), t > 0 && (e[n - 1][me] = r[me]);
    let i = Yn(e, le + t);
    Bm(r[T], r);
    let s = i[er];
    s !== null && s.detachView(i[T]), (r[Y] = null), (r[me] = null), (r[S] &= -129);
  }
  return r;
}
function Rv(e, t, n, r) {
  let o = le + r,
    i = n.length;
  r > 0 && (n[o - 1][me] = t),
    r < i - le ? ((t[me] = n[o]), $s(n, le + r, t)) : (n.push(t), (t[me] = null)),
    (t[Y] = n);
  let s = t[fn];
  s !== null && n !== s && Pf(s, t);
  let a = t[er];
  a !== null && a.insertView(e), jo(t), (t[S] |= 128);
}
function Pf(e, t) {
  let n = e[ir],
    r = t[Y];
  if (Ge(r)) e[S] |= 2;
  else {
    let o = r[Y][ye];
    t[ye] !== o && (e[S] |= 2);
  }
  n === null ? (e[ir] = [t]) : n.push(t);
}
var Ht = class {
  _lView;
  _cdRefInjectingView;
  _appRef = null;
  _attachedToViewContainer = !1;
  exhaustive;
  get rootNodes() {
    let t = this._lView,
      n = t[T];
    return mr(n, t, n.firstChild, []);
  }
  constructor(t, n) {
    (this._lView = t), (this._cdRefInjectingView = n);
  }
  get context() {
    return this._lView[ce];
  }
  set context(t) {
    this._lView[ce] = t;
  }
  get destroyed() {
    return Ot(this._lView);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      let t = this._lView[Y];
      if (Se(t)) {
        let n = t[or],
          r = n ? n.indexOf(this) : -1;
        r > -1 && (ja(t, r), Yn(n, r));
      }
      this._attachedToViewContainer = !1;
    }
    mf(this._lView[T], this._lView);
  }
  onDestroy(t) {
    na(this._lView, t);
  }
  markForCheck() {
    lc(this._cdRefInjectingView || this._lView, 4);
  }
  detach() {
    this._lView[S] &= -129;
  }
  reattach() {
    jo(this._lView), (this._lView[S] |= 128);
  }
  detectChanges() {
    (this._lView[S] |= 1024), xf(this._lView);
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new v(902, !1);
    this._attachedToViewContainer = !0;
  }
  detachFromAppRef() {
    this._appRef = null;
    let t = pn(this._lView),
      n = this._lView[fn];
    n !== null && !t && ac(n, this._lView), gf(this._lView[T], this._lView);
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer) throw new v(902, !1);
    this._appRef = t;
    let n = pn(this._lView),
      r = this._lView[fn];
    r !== null && !n && Pf(r, this._lView), jo(this._lView);
  }
};
function uc(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = xv(e, t, n, r, o)), Ou() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = Nu();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return lr(i, !0), i;
}
function xv(e, t, n, r, o) {
  let i = sa(),
    s = aa(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = Ov(e, a, n, t, r, o));
  return Av(e, c, i, s), c;
}
function Av(e, t, n, r) {
  e.firstChild === null && (e.firstChild = t),
    n !== null &&
      (r
        ? n.child == null && t.parent !== null && (n.child = t)
        : n.next === null && ((n.next = t), (t.prev = n)));
}
function Ov(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Mu() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: null,
      inputs: null,
      hostDirectiveInputs: null,
      outputs: null,
      hostDirectiveOutputs: null,
      directiveToIndex: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
var qM = new RegExp(`^(\\d+)*(${lm}|${cm})*(.*)`);
var kv = () => null;
function cd(e, t) {
  return kv(e, t);
}
var Lf = class {},
  mi = class {},
  Ha = class {
    resolveComponentFactory(t) {
      throw new v(917, !1);
    }
  },
  Ir = class {
    static NULL = new Ha();
  },
  Vt = class {};
var Ff = (() => {
  class e {
    static ɵprov = E({ token: e, providedIn: 'root', factory: () => null });
  }
  return e;
})();
var qo = {},
  Va = class {
    injector;
    parentInjector;
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      let o = this.injector.get(t, qo, r);
      return o !== qo || n === qo ? o : this.parentInjector.get(t, n, r);
    }
  };
function Xo(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = To(o, a);
      else if (i == 2) {
        let c = a,
          l = t[++s];
        r = To(r, c + ': ' + l + ';');
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r), n ? (e.classes = o) : (e.classesWithoutHost = o);
}
function jf(e, t = 0) {
  let n = $();
  if (n === null) return b(e, t);
  let r = Te();
  return kd(r, n, ae(e), t);
}
function Pv(e, t, n, r, o) {
  let i = r === null ? null : { '': -1 },
    s = o(e, n);
  if (s !== null) {
    let a = s,
      c = null,
      l = null;
    for (let u of s)
      if (u.resolveHostDirectives !== null) {
        [a, c, l] = u.resolveHostDirectives(s);
        break;
      }
    jv(e, t, n, a, i, c, l);
  }
  i !== null && r !== null && Lv(n, r, i);
}
function Lv(e, t, n) {
  let r = (e.localNames = []);
  for (let o = 0; o < t.length; o += 2) {
    let i = n[t[o + 1]];
    if (i == null) throw new v(-301, !1);
    r.push(t[o], i);
  }
}
function Fv(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function jv(e, t, n, r, o, i, s) {
  let a = r.length,
    c = !1;
  for (let p = 0; p < a; p++) {
    let f = r[p];
    !c && At(f) && ((c = !0), Fv(e, n, p)), Kg(Rd(n, t), e, f.type);
  }
  zv(n, e.data.length, a);
  for (let p = 0; p < a; p++) {
    let f = r[p];
    f.providersResolver && f.providersResolver(f);
  }
  let l = !1,
    u = !1,
    d = af(e, t, a, null);
  a > 0 && (n.directiveToIndex = new Map());
  for (let p = 0; p < a; p++) {
    let f = r[p];
    if (
      ((n.mergedAttrs = Za(n.mergedAttrs, f.hostAttrs)),
      Vv(e, n, t, d, f),
      Bv(d, f, o),
      s !== null && s.has(f))
    ) {
      let [C, L] = s.get(f);
      n.directiveToIndex.set(f.type, [d, C + n.directiveStart, L + n.directiveStart]);
    } else (i === null || !i.has(f)) && n.directiveToIndex.set(f.type, d);
    f.contentQueries !== null && (n.flags |= 4),
      (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) && (n.flags |= 64);
    let m = f.type.prototype;
    !l &&
      (m.ngOnChanges || m.ngOnInit || m.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (l = !0)),
      !u &&
        (m.ngOnChanges || m.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (u = !0)),
      d++;
  }
  Hv(e, n, i);
}
function Hv(e, t, n) {
  for (let r = t.directiveStart; r < t.directiveEnd; r++) {
    let o = e.data[r];
    if (n === null || !n.has(o)) ld(0, t, o, r), ld(1, t, o, r), dd(t, r, !1);
    else {
      let i = n.get(o);
      ud(0, t, i, r), ud(1, t, i, r), dd(t, r, !0);
    }
  }
}
function ld(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s;
      e === 0 ? (s = t.inputs ??= {}) : (s = t.outputs ??= {}),
        (s[i] ??= []),
        s[i].push(r),
        Hf(t, i);
    }
}
function ud(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s = o[i],
        a;
      e === 0 ? (a = t.hostDirectiveInputs ??= {}) : (a = t.hostDirectiveOutputs ??= {}),
        (a[s] ??= []),
        a[s].push(r, i),
        Hf(t, s);
    }
}
function Hf(e, t) {
  t === 'class' ? (e.flags |= 8) : t === 'style' && (e.flags |= 16);
}
function dd(e, t, n) {
  let { attrs: r, inputs: o, hostDirectiveInputs: i } = e;
  if (r === null || (!n && o === null) || (n && i === null) || nc(e)) {
    (e.initialInputs ??= []), e.initialInputs.push(null);
    return;
  }
  let s = null,
    a = 0;
  for (; a < r.length; ) {
    let c = r[a];
    if (c === 0) {
      a += 4;
      continue;
    } else if (c === 5) {
      a += 2;
      continue;
    } else if (typeof c == 'number') break;
    if (!n && o.hasOwnProperty(c)) {
      let l = o[c];
      for (let u of l)
        if (u === t) {
          (s ??= []), s.push(c, r[a + 1]);
          break;
        }
    } else if (n && i.hasOwnProperty(c)) {
      let l = i[c];
      for (let u = 0; u < l.length; u += 2)
        if (l[u] === t) {
          (s ??= []), s.push(l[u + 1], r[a + 1]);
          break;
        }
    }
    a += 2;
  }
  (e.initialInputs ??= []), e.initialInputs.push(s);
}
function Vv(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = bt(o.type, !0)),
    s = new hr(i, At(o), jf, null);
  (e.blueprint[r] = s), (n[r] = s), Uv(e, t, r, af(e, n, o.hostVars, Ye), o);
}
function Uv(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    $v(s) != a && s.push(a), s.push(n, r, i);
  }
}
function $v(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function Bv(e, t, n) {
  if (n) {
    if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    At(t) && (n[''] = e);
  }
}
function zv(e, t, n) {
  (e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
}
function Vf(e, t, n, r, o, i, s, a) {
  let c = t[T],
    l = c.consts,
    u = sr(l, s),
    d = uc(c, e, n, r, u);
  return (
    i && Pv(c, t, d, sr(l, a), o),
    (d.mergedAttrs = Za(d.mergedAttrs, d.attrs)),
    d.attrs !== null && Xo(d, d.attrs, !1),
    d.mergedAttrs !== null && Xo(d, d.mergedAttrs, !0),
    c.queries !== null && c.queries.elementStart(c, d),
    d
  );
}
function Uf(e, t) {
  Vg(e, t), Js(t) && e.queries.elementEnd(t);
}
function qv(e, t, n, r, o, i) {
  let s = t.consts,
    a = sr(s, o),
    c = uc(t, e, n, r, a);
  if (((c.mergedAttrs = Za(c.mergedAttrs, c.attrs)), i != null)) {
    let l = sr(s, i);
    c.localNames = [];
    for (let u = 0; u < l.length; u += 2) c.localNames.push(l[u], -1);
  }
  return (
    c.attrs !== null && Xo(c, c.attrs, !1),
    c.mergedAttrs !== null && Xo(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function dc(e, t, n) {
  if (n === Ye) return !1;
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Gv(e, t, n) {
  return function r(o) {
    let i = xt(e) ? Fe(e.index, t) : t;
    lc(i, 5);
    let s = t[ce],
      a = fd(t, s, n, o),
      c = r.__ngNextListenerFn__;
    for (; c; ) (a = fd(t, s, c, o) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function fd(e, t, n, r) {
  let o = _(null);
  try {
    return F(6, t, n), n(r) !== !1;
  } catch (i) {
    return fv(e, i), !1;
  } finally {
    F(7, t, n), _(o);
  }
}
function Wv(e, t, n, r, o, i, s, a) {
  let c = Po(e),
    l = !1,
    u = null;
  if ((!r && c && (u = Qv(t, n, i, e.index)), u !== null)) {
    let d = u.__ngLastListenerFn__ || u;
    (d.__ngNextListenerFn__ = s), (u.__ngLastListenerFn__ = s), (l = !0);
  } else {
    let d = Le(e, n),
      p = r ? r(d) : d;
    dm(n, p, i, a);
    let f = o.listen(p, i, a);
    if (!Zv(i)) {
      let m = r ? (C) => r(Ie(C[e.index])) : e.index;
      Yv(m, t, n, i, a, f, !1);
    }
  }
  return l;
}
function Zv(e) {
  return e.startsWith('animation') || e.startsWith('transition');
}
function Qv(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[ln],
          c = o[i + 2];
        return a && a.length > c ? a[c] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function Yv(e, t, n, r, o, i, s) {
  let a = t.firstCreatePass ? bu(t) : null,
    c = Cu(n),
    l = c.length;
  c.push(o, i), a && a.push(r, e, l, (l + 1) * (s ? -1 : 1));
}
var Ua = Symbol('BINDING');
var ei = class extends Ir {
  ngModule;
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = at(t);
    return new vn(n, this.ngModule);
  }
};
function Kv(e) {
  return Object.keys(e).map((t) => {
    let [n, r, o] = e[t],
      i = { propName: n, templateName: t, isSignal: (r & pi.SignalBased) !== 0 };
    return o && (i.transform = o), i;
  });
}
function Jv(e) {
  return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
}
function Xv(e, t, n) {
  let r = t instanceof Q ? t : t?.injector;
  return (
    r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r),
    r ? new Va(n, r) : n
  );
}
function ey(e) {
  let t = e.get(Vt, null);
  if (t === null) throw new v(407, !1);
  let n = e.get(Ff, null),
    r = e.get(Tt, null);
  return { rendererFactory: t, sanitizer: n, changeDetectionScheduler: r, ngReflect: !1 };
}
function ty(e, t) {
  let n = $f(e);
  return ef(t, n, n === 'svg' ? Eu : n === 'math' ? Iu : null);
}
function $f(e) {
  return (e.selectors[0][0] || 'div').toLowerCase();
}
var vn = class extends mi {
  componentDef;
  ngModule;
  selector;
  componentType;
  ngContentSelectors;
  isBoundToModule;
  cachedInputs = null;
  cachedOutputs = null;
  get inputs() {
    return (this.cachedInputs ??= Kv(this.componentDef.inputs)), this.cachedInputs;
  }
  get outputs() {
    return (this.cachedOutputs ??= Jv(this.componentDef.outputs)), this.cachedOutputs;
  }
  constructor(t, n) {
    super(),
      (this.componentDef = t),
      (this.ngModule = n),
      (this.componentType = t.type),
      (this.selector = bm(t.selectors)),
      (this.ngContentSelectors = t.ngContentSelectors ?? []),
      (this.isBoundToModule = !!n);
  }
  create(t, n, r, o, i, s) {
    F(22);
    let a = _(null);
    try {
      let c = this.componentDef,
        l = ny(r, c, s, i),
        u = Xv(c, o || this.ngModule, t),
        d = ey(u),
        p = d.rendererFactory.createRenderer(null, c),
        f = r ? rv(p, r, c.encapsulation, u) : ty(c, p),
        m = s?.some(pd) || i?.some((P) => typeof P != 'function' && P.bindings.some(pd)),
        C = of(null, l, null, 512 | sf(c), null, null, d, p, u, null, Gd(f, u, !0));
      (C[Ee] = f), Vo(C);
      let L = null;
      try {
        let P = Vf(Ee, C, 2, '#host', () => l.directiveRegistry, !0, 0);
        nf(p, f, P),
          gr(f, C),
          If(l, C, P),
          Zd(l, P, C),
          Uf(l, P),
          n !== void 0 && oy(P, this.ngContentSelectors, n),
          (L = Fe(P.index, C)),
          (C[ce] = L[ce]),
          Sf(l, C, null);
      } catch (P) {
        throw (L !== null && Ra(L), Ra(C), P);
      } finally {
        F(23), Uo();
      }
      return new ti(this.componentType, C, !!m);
    } finally {
      _(a);
    }
  }
};
function ny(e, t, n, r) {
  let o = e ? ['ng-version', '20.3.9'] : Sm(t.selectors[0]),
    i = null,
    s = null,
    a = 0;
  if (n)
    for (let u of n)
      (a += u[Ua].requiredVars),
        u.create && ((u.targetIdx = 0), (i ??= []).push(u)),
        u.update && ((u.targetIdx = 0), (s ??= []).push(u));
  if (r)
    for (let u = 0; u < r.length; u++) {
      let d = r[u];
      if (typeof d != 'function')
        for (let p of d.bindings) {
          a += p[Ua].requiredVars;
          let f = u + 1;
          p.create && ((p.targetIdx = f), (i ??= []).push(p)),
            p.update && ((p.targetIdx = f), (s ??= []).push(p));
        }
    }
  let c = [t];
  if (r)
    for (let u of r) {
      let d = typeof u == 'function' ? u : u.type,
        p = Ws(d);
      c.push(p);
    }
  return rf(0, null, ry(i, s), 1, a, c, null, null, null, [o], null);
}
function ry(e, t) {
  return !e && !t
    ? null
    : (n) => {
        if (n & 1 && e) for (let r of e) r.create();
        if (n & 2 && t) for (let r of t) r.update();
      };
}
function pd(e) {
  let t = e[Ua].kind;
  return t === 'input' || t === 'twoWay';
}
var ti = class extends Lf {
  _rootLView;
  _hasInputBindings;
  instance;
  hostView;
  changeDetectorRef;
  componentType;
  location;
  previousInputValues = null;
  _tNode;
  constructor(t, n, r) {
    super(),
      (this._rootLView = n),
      (this._hasInputBindings = r),
      (this._tNode = Lo(n[T], Ee)),
      (this.location = Ya(this._tNode, n)),
      (this.instance = Fe(this._tNode.index, n)[ce]),
      (this.hostView = this.changeDetectorRef = new Ht(n, void 0)),
      (this.componentType = t);
  }
  setInput(t, n) {
    this._hasInputBindings;
    let r = this._tNode;
    if (
      ((this.previousInputValues ??= new Map()),
      this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
    )
      return;
    let o = this._rootLView,
      i = bf(r, o[T], o, t, n);
    this.previousInputValues.set(t, n);
    let s = Fe(r.index, o);
    lc(s, 1);
  }
  get injector() {
    return new jt(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
};
function oy(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
var vi = (() => {
  class e {
    static __NG_ELEMENT_ID__ = iy;
  }
  return e;
})();
function iy() {
  let e = Te();
  return ay(e, $());
}
var sy = vi,
  Bf = class extends sy {
    _lContainer;
    _hostTNode;
    _hostLView;
    constructor(t, n, r) {
      super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r);
    }
    get element() {
      return Ya(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new jt(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Qa(this._hostTNode, this._hostLView);
      if (_d(t)) {
        let n = Zo(t, this._hostLView),
          r = Wo(t),
          o = n[T].data[r + 8];
        return new jt(o, n);
      } else return new jt(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = hd(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - le;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == 'number' ? (o = r) : r != null && ((o = r.index), (i = r.injector));
      let s = cd(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, ad(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i, s, a) {
      let c = t && !Pg(t),
        l;
      if (c) l = n;
      else {
        let L = n || {};
        (l = L.index),
          (r = L.injector),
          (o = L.projectableNodes),
          (i = L.environmentInjector || L.ngModuleRef),
          (s = L.directives),
          (a = L.bindings);
      }
      let u = c ? t : new vn(at(t)),
        d = r || this.parentInjector;
      if (!i && u.ngModule == null) {
        let P = (c ? d : this.parentInjector).get(Q, null);
        P && (i = P);
      }
      let p = at(u.componentType ?? {}),
        f = cd(this._lContainer, p?.id ?? null),
        m = f?.firstChild ?? null,
        C = u.create(d, o, m, i, s, a);
      return this.insertImpl(C.hostView, l, ad(this._hostTNode, f)), C;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (wu(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[Y],
            l = new Bf(c, c[ve], c[Y]);
          l.detach(l.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return Nv(s, o, i, r), t.attachToViewContainerRef(), $s(ba(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = hd(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = ja(this._lContainer, n);
      r && (Yn(ba(this._lContainer), n), mf(r[T], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = ja(this._lContainer, n);
      return r && Yn(ba(this._lContainer), n) != null ? new Ht(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function hd(e) {
  return e[or];
}
function ba(e) {
  return e[or] || (e[or] = []);
}
function ay(e, t) {
  let n,
    r = t[e.index];
  return (
    Se(r) ? (n = r) : ((n = Mv(r, t, null, e)), (t[e.index] = n), cf(t, n)),
    ly(n, t, e, r),
    new Bf(n, e, t)
  );
}
function cy(e, t) {
  let n = e[K],
    r = n.createComment(''),
    o = Le(t, e),
    i = n.parentNode(o);
  return Yo(n, i, r, n.nextSibling(o), !1), r;
}
var ly = uy;
function uy(e, t, n, r) {
  if (e[lt]) return;
  let o;
  n.type & 8 ? (o = Ie(r)) : (o = cy(t, n)), (e[lt] = o);
}
var yn = class {},
  yi = class {};
var ni = class extends yn {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    componentFactoryResolver = new ei(this);
    constructor(t, n, r, o = !0) {
      super(), (this.ngModuleType = t), (this._parent = n);
      let i = Gs(t);
      (this._bootstrapComponents = Jd(i.bootstrap)),
        (this._r3Injector = ma(
          t,
          n,
          [
            { provide: yn, useValue: this },
            { provide: Ir, useValue: this.componentFactoryResolver },
            ...r,
          ],
          it(t),
          new Set(['environment'])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  ri = class extends yi {
    moduleType;
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new ni(this.moduleType, t, []);
    }
  };
var vr = class extends yn {
  injector;
  componentFactoryResolver = new ei(this);
  instance = null;
  constructor(t) {
    super();
    let n = new St(
      [
        ...t.providers,
        { provide: yn, useValue: this },
        { provide: Ir, useValue: this.componentFactoryResolver },
      ],
      t.parent || Jn(),
      t.debugName,
      new Set(['environment'])
    );
    (this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function wr(e, t, n = null) {
  return new vr({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 }).injector;
}
var dy = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(n) {
      this._injector = n;
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Zs(!1, n.type),
          o = r.length > 0 ? wr([r], this._injector, `Standalone[${n.type.name}]`) : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = E({ token: e, providedIn: 'environment', factory: () => new e(b(Q)) });
  }
  return e;
})();
function Ke(e) {
  return ai(() => {
    let t = zf(e),
      n = j(g({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === Ka.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: t.standalone
          ? (o) => o.get(dy).getOrCreateStandaloneInjector(n)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Ze.Emulated,
        styles: e.styles || Ae,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    t.standalone && hi('NgStandalone'), qf(n);
    let r = e.dependencies;
    return (n.directiveDefs = gd(r, fy)), (n.pipeDefs = gd(r, du)), (n.id = gy(n)), n;
  });
}
function fy(e) {
  return at(e) || Ws(e);
}
function py(e, t) {
  if (e == null) return Mt;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a,
        c;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i), (c = o[3] || null))
        : ((i = o), (s = o), (a = pi.None), (c = null)),
        (n[i] = [r, a, c]),
        (t[i] = s);
    }
  return n;
}
function hy(e) {
  if (e == null) return Mt;
  let t = {};
  for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
  return t;
}
function fc(e) {
  return ai(() => {
    let t = zf(e);
    return qf(t), t;
  });
}
function zf(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputConfig: e.inputs || Mt,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? !0,
    signals: e.signals === !0,
    selectors: e.selectors || Ae,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    resolveHostDirectives: null,
    hostDirectives: null,
    inputs: py(e.inputs, t),
    outputs: hy(e.outputs),
    debugInfo: null,
  };
}
function qf(e) {
  e.features?.forEach((t) => t(e));
}
function gd(e, t) {
  return e
    ? () => {
        let n = typeof e == 'function' ? e() : e,
          r = [];
        for (let o of n) {
          let i = t(o);
          i !== null && r.push(i);
        }
        return r;
      }
    : null;
}
function gy(e) {
  let t = 0,
    n = typeof e.consts == 'function' ? '' : e.consts,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      n,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ];
  for (let i of r.join('|')) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
  return (t += 2147483648), 'c' + t;
}
var pc = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'platform' });
  }
  return e;
})();
var hc = new y('');
function Dr(e) {
  return !!e && typeof e.then == 'function';
}
function Gf(e) {
  return !!e && typeof e.subscribe == 'function';
}
var Wf = new y('');
var gc = (() => {
    class e {
      resolve;
      reject;
      initialized = !1;
      done = !1;
      donePromise = new Promise((n, r) => {
        (this.resolve = n), (this.reject = r);
      });
      appInits = h(Wf, { optional: !0 }) ?? [];
      injector = h(Oe);
      constructor() {}
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = ee(this.injector, o);
          if (Dr(i)) n.push(i);
          else if (Gf(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Ei = new y('');
function Zf() {
  ss(() => {
    let e = '';
    throw new v(600, e);
  });
}
function Qf(e) {
  return e.isBoundToModule;
}
var my = 10;
var $t = (() => {
  class e {
    _runningTick = !1;
    _destroyed = !1;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = h(we);
    afterRenderManager = h(pf);
    zonelessEnabled = h(ur);
    rootEffectScheduler = h(Ia);
    dirtyFlags = 0;
    tracingSnapshot = null;
    allTestViews = new Set();
    autoDetectTestViews = new Set();
    includeAllTestViews = !1;
    afterTick = new W();
    get allViews() {
      return [
        ...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(),
        ...this._views,
      ];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    internalPendingTask = h(We);
    get isStable() {
      return this.internalPendingTask.hasPendingTasksObservable.pipe(R((n) => !n));
    }
    constructor() {
      h(Er, { optional: !0 });
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    _injector = h(Q);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      return this.bootstrapImpl(n, r);
    }
    bootstrapImpl(n, r, o = Oe.NULL) {
      return this._injector.get(B).run(() => {
        F(10);
        let s = n instanceof mi;
        if (!this._injector.get(gc).done) {
          let m = '';
          throw new v(405, m);
        }
        let c;
        s ? (c = n) : (c = this._injector.get(Ir).resolveComponentFactory(n)),
          this.componentTypes.push(c.componentType);
        let l = Qf(c) ? void 0 : this._injector.get(yn),
          u = r || c.selector,
          d = c.create(o, [], u, l),
          p = d.location.nativeElement,
          f = d.injector.get(hc, null);
        return (
          f?.registerApplication(p),
          d.onDestroy(() => {
            this.detachView(d.hostView), pr(this.components, d), f?.unregisterApplication(p);
          }),
          this._loadComponent(d),
          F(11, d),
          d
        );
      });
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      F(12),
        this.tracingSnapshot !== null
          ? this.tracingSnapshot.run(oc.CHANGE_DETECTION, this.tickImpl)
          : this.tickImpl();
    }
    tickImpl = () => {
      if (this._runningTick) throw new v(101, !1);
      let n = _(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } finally {
        (this._runningTick = !1),
          this.tracingSnapshot?.dispose(),
          (this.tracingSnapshot = null),
          _(n),
          this.afterTick.next(),
          F(13);
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(Vt, null, { optional: !0 }));
      let n = 0;
      for (; this.dirtyFlags !== 0 && n++ < my; ) F(14), this.synchronizeOnce(), F(15);
    }
    synchronizeOnce() {
      this.dirtyFlags & 16 && ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
      let n = !1;
      if (this.dirtyFlags & 7) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8), (this.dirtyFlags |= 8);
        for (let { _lView: o } of this.allViews) {
          if (!r && !ar(o)) continue;
          let i = r && !this.zonelessEnabled ? 0 : 1;
          xf(o, i), (n = !0);
        }
        if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)) return;
      }
      n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
        this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => ar(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      pr(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView);
      try {
        this.tick();
      } catch (o) {
        this.internalErrorHandler(o);
      }
      this.components.push(n), this._injector.get(Ei, []).forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0), (this._views = []), (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return this._destroyListeners.push(n), () => pr(this._destroyListeners, n);
    }
    destroy() {
      if (this._destroyed) throw new v(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function pr(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var JM = typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function';
function $a(e, t, n, r, o) {
  bf(t, e, n, o ? 'class' : 'style', r);
}
function dt(e, t, n, r) {
  let o = $(),
    i = o[T],
    s = e + Ee,
    a = i.firstCreatePass ? Vf(s, o, 2, t, uv, _u(), n, r) : i.data[s];
  if ((Df(a, o, e, t, Yf), Po(a))) {
    let c = o[T];
    If(c, o, a), Zd(c, a, o);
  }
  return r != null && wf(o, a), dt;
}
function Me() {
  let e = kt(),
    t = Te(),
    n = Cf(t);
  return (
    e.firstCreatePass && Uf(e, n),
    oa(n) && ia(),
    ra(),
    n.classesWithoutHost != null && $g(n) && $a(e, n, $(), n.classesWithoutHost, !0),
    n.stylesWithoutHost != null && Bg(n) && $a(e, n, $(), n.stylesWithoutHost, !1),
    Me
  );
}
function He(e, t, n, r) {
  return dt(e, t, n, r), Me(), He;
}
function ft(e, t, n, r) {
  let o = $(),
    i = o[T],
    s = e + Ee,
    a = i.firstCreatePass ? qv(s, i, 2, t, n, r) : i.data[s];
  return Df(a, o, e, t, Yf), r != null && wf(o, a), ft;
}
function pt() {
  let e = Te(),
    t = Cf(e);
  return oa(t) && ia(), ra(), pt;
}
function Ii(e, t, n, r) {
  return ft(e, t, n, r), pt(), Ii;
}
var Yf = (e, t, n, r, o) => (ga(!0), ef(t[K], r, Uu()));
function wi(e, t, n) {
  let r = $(),
    o = ua();
  if (dc(r, o, t)) {
    let i = kt(),
      s = Vu();
    sv(s, r, e, t, r[K], n);
  }
  return wi;
}
var Cr = 'en-US';
var vy = Cr;
function Kf(e) {
  typeof e == 'string' && (vy = e.toLowerCase().replace(/_/g, '-'));
}
function Di(e, t, n) {
  let r = $(),
    o = kt(),
    i = Te();
  return (i.type & 3 || n) && Wv(i, o, r, n, r[K], e, t, Gv(i, r, t)), Di;
}
function $o(e, t) {
  return (e << 17) | (t << 2);
}
function Ut(e) {
  return (e >> 17) & 32767;
}
function yy(e) {
  return (e & 2) == 2;
}
function Ey(e, t) {
  return (e & 131071) | (t << 17);
}
function Ba(e) {
  return e | 2;
}
function En(e) {
  return (e & 131068) >> 2;
}
function Sa(e, t) {
  return (e & -131069) | (t << 2);
}
function Iy(e) {
  return (e & 1) === 1;
}
function za(e) {
  return e | 1;
}
function wy(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = Ut(s),
    c = En(s);
  e[r] = n;
  let l = !1,
    u;
  if (Array.isArray(n)) {
    let d = n;
    (u = d[1]), (u === null || cn(d, u) > 0) && (l = !0);
  } else u = n;
  if (o)
    if (c !== 0) {
      let p = Ut(e[a + 1]);
      (e[r + 1] = $o(p, a)), p !== 0 && (e[p + 1] = Sa(e[p + 1], r)), (e[a + 1] = Ey(e[a + 1], r));
    } else (e[r + 1] = $o(a, 0)), a !== 0 && (e[a + 1] = Sa(e[a + 1], r)), (a = r);
  else (e[r + 1] = $o(c, 0)), a === 0 ? (a = r) : (e[c + 1] = Sa(e[c + 1], r)), (c = r);
  l && (e[r + 1] = Ba(e[r + 1])),
    md(e, u, r, !0),
    md(e, u, r, !1),
    Dy(t, u, e, r, i),
    (s = $o(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function Dy(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null && typeof t == 'string' && cn(i, t) >= 0 && (n[r + 1] = za(n[r + 1]));
}
function md(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? Ut(o) : En(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      l = e[s + 1];
    Cy(c, t) && ((a = !0), (e[s + 1] = r ? za(l) : Ba(l))), (s = r ? Ut(l) : En(l));
  }
  a && (e[n + 1] = r ? Ba(o) : za(o));
}
function Cy(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == 'string'
    ? cn(e, t) >= 0
    : !1;
}
var te = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function by(e) {
  return e.substring(te.key, te.keyEnd);
}
function Sy(e) {
  return e.substring(te.value, te.valueEnd);
}
function Ty(e) {
  return _y(e), Jf(e, oi(e, 0, te.textEnd));
}
function Jf(e, t) {
  let n = te.textEnd,
    r = (te.key = oi(e, t, n));
  return n === r
    ? -1
    : ((r = te.keyEnd = My(e, r, n)),
      (r = vd(e, r, n, 58)),
      (r = te.value = oi(e, r, n)),
      (r = te.valueEnd = Ny(e, r, n)),
      vd(e, r, n, 59));
}
function _y(e) {
  (te.key = 0), (te.keyEnd = 0), (te.value = 0), (te.valueEnd = 0), (te.textEnd = e.length);
}
function oi(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function My(e, t, n) {
  let r;
  for (
    ;
    t < n &&
    ((r = e.charCodeAt(t)) === 45 ||
      r === 95 ||
      ((r & -33) >= 65 && (r & -33) <= 90) ||
      (r >= 48 && r <= 57));

  )
    t++;
  return t;
}
function vd(e, t, n, r) {
  return (t = oi(e, t, n)), t < n && t++, t;
}
function Ny(e, t, n) {
  let r = -1,
    o = -1,
    i = -1,
    s = t,
    a = s;
  for (; s < n; ) {
    let c = e.charCodeAt(s++);
    if (c === 59) return a;
    c === 34 || c === 39
      ? (a = s = yd(e, c, s, n))
      : t === s - 4 && i === 85 && o === 82 && r === 76 && c === 40
      ? (a = s = yd(e, 41, s, n))
      : c > 32 && (a = s),
      (i = o),
      (o = r),
      (r = c & -33);
  }
  return a;
}
function yd(e, t, n, r) {
  let o = -1,
    i = n;
  for (; i < r; ) {
    let s = e.charCodeAt(i++);
    if (s == t && o !== 92) return i;
    s == 92 && o === 92 ? (o = 0) : (o = s);
  }
  throw new Error();
}
function mc(e) {
  xy(ep, Ry, e, !1);
}
function Ry(e, t) {
  for (let n = Ty(t); n >= 0; n = Jf(t, n)) ep(e, by(t), Sy(t));
}
function xy(e, t, n, r) {
  let o = kt(),
    i = Au(2);
  o.firstUpdatePass && Ay(o, null, i, r);
  let s = $();
  if (n !== Ye && dc(s, i, n)) {
    let a = o.data[Pt()];
    if (tp(a, r) && !Xf(o, i)) {
      let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (n = To(c, n || '')), $a(o, a, s, n, r);
    } else jy(o, a, s, s[K], s[i + 1], (s[i + 1] = Fy(e, t, n)), r, i);
  }
}
function Xf(e, t) {
  return t >= e.expandoStartIndex;
}
function Ay(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[Pt()],
      s = Xf(e, n);
    tp(i, r) && t === null && !s && (t = !1), (t = Oy(o, i, t, r)), wy(o, i, t, n, s, r);
  }
}
function Oy(e, t, n, r) {
  let o = Lu(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = Ta(null, e, t, n, r)), (n = yr(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = Ta(o, e, t, n, r)), i === null)) {
        let c = ky(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = Ta(null, e, t, c[1], r)), (c = yr(c, t.attrs, r)), Py(e, t, r, c));
      } else i = Ly(e, t, r);
  }
  return i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n;
}
function ky(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (En(r) !== 0) return e[Ut(r)];
}
function Py(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[Ut(o)] = r;
}
function Ly(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = yr(r, s, n);
  }
  return yr(r, t.attrs, n);
}
function Ta(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = yr(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function yr(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), Bs(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function Fy(e, t, n) {
  if (n == null || n === '') return Ae;
  let r = [],
    o = fi(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == 'object') for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function ep(e, t, n) {
  Bs(e, t, fi(n));
}
function jy(e, t, n, r, o, i, s, a) {
  o === Ye && (o = Ae);
  let c = 0,
    l = 0,
    u = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; u !== null || d !== null; ) {
    let p = c < o.length ? o[c + 1] : void 0,
      f = l < i.length ? i[l + 1] : void 0,
      m = null,
      C;
    u === d
      ? ((c += 2), (l += 2), p !== f && ((m = d), (C = f)))
      : d === null || (u !== null && u < d)
      ? ((c += 2), (m = u))
      : ((l += 2), (m = d), (C = f)),
      m !== null && Hy(e, t, n, r, m, C, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null);
  }
}
function Hy(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = Iy(l) ? Ed(c, t, n, o, En(l), s) : void 0;
  if (!ii(u)) {
    ii(i) || (yy(l) && (i = Ed(c, null, n, o, a, s)));
    let d = Xs(Pt(), n);
    nv(r, s, d, o, i);
  }
}
function Ed(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[o + 1];
    p === Ye && (p = d ? Ae : void 0);
    let f = d ? Ao(p, r) : u === r ? p : void 0;
    if ((l && !ii(f) && (f = Ao(c, r)), ii(f) && ((a = f), s))) return a;
    let m = e[o + 1];
    o = s ? Ut(m) : En(m);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = Ao(c, r));
  }
  return a;
}
function ii(e) {
  return e !== void 0;
}
function tp(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function Ne(e, t = '') {
  let n = $(),
    r = kt(),
    o = e + Ee,
    i = r.firstCreatePass ? uc(r, o, 1, t, null) : r.data[o],
    s = Vy(r, n, i, t, e);
  (n[o] = s), ha() && vf(r, n, s, i), lr(i, !1);
}
var Vy = (e, t, n, r, o) => (ga(!0), Tm(t[K], r));
function Uy(e, t, n, r = '') {
  return dc(e, ua(), n) ? t + No(n) + r : Ye;
}
function br(e, t, n) {
  let r = $(),
    o = Uy(r, e, t, n);
  return o !== Ye && $y(r, Pt(), o), br;
}
function $y(e, t, n) {
  let r = Xs(t, e);
  _m(e[K], r, n);
}
var si = class {
    ngModuleFactory;
    componentFactories;
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  vc = (() => {
    class e {
      compileModuleSync(n) {
        return new ri(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = Gs(n),
          i = Jd(o.declarations).reduce((s, a) => {
            let c = at(a);
            return c && s.push(new vn(c)), s;
          }, []);
        return new si(r, i);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
var By = (() => {
    class e {
      zone = h(B);
      changeDetectionScheduler = h(Tt);
      applicationRef = h($t);
      applicationErrorHandler = h(we);
      _onMicrotaskEmptySubscription;
      initialize() {
        this._onMicrotaskEmptySubscription ||
          (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.changeDetectionScheduler.runningTick ||
                this.zone.run(() => {
                  try {
                    (this.applicationRef.dirtyFlags |= 1), this.applicationRef._tick();
                  } catch (n) {
                    this.applicationErrorHandler(n);
                  }
                });
            },
          }));
      }
      ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  np = new y('', { factory: () => !1 });
function yc({ ngZoneFactory: e, ignoreChangesOutsideZone: t, scheduleInRootZone: n }) {
  return (
    (e ??= () => new B(j(g({}, Ic()), { scheduleInRootZone: n }))),
    [
      { provide: B, useFactory: e },
      {
        provide: qe,
        multi: !0,
        useFactory: () => {
          let r = h(By, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: qe,
        multi: !0,
        useFactory: () => {
          let r = h(zy);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: ya, useValue: !0 } : [],
      { provide: Ea, useValue: n ?? uf },
      {
        provide: we,
        useFactory: () => {
          let r = h(B),
            o = h(Q),
            i;
          return (s) => {
            r.runOutsideAngular(() => {
              o.destroyed && !i
                ? setTimeout(() => {
                    throw s;
                  })
                : ((i ??= o.get(ke)), i.handleError(s));
            });
          };
        },
      },
    ]
  );
}
function Ec(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = e?.scheduleInRootZone,
    r = yc({
      ngZoneFactory: () => {
        let o = Ic(e);
        return (
          (o.scheduleInRootZone = n),
          o.shouldCoalesceEventChangeDetection && hi('NgZone_CoalesceEvent'),
          new B(o)
        );
      },
      ignoreChangesOutsideZone: t,
      scheduleInRootZone: n,
    });
  return Nt([{ provide: np, useValue: !0 }, { provide: ur, useValue: !1 }, r]);
}
function Ic(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var zy = (() => {
  class e {
    subscription = new H();
    initialized = !1;
    zone = h(B);
    pendingTasks = h(We);
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              B.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            B.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
var rp = (() => {
  class e {
    applicationErrorHandler = h(we);
    appRef = h($t);
    taskService = h(We);
    ngZone = h(B);
    zonelessEnabled = h(ur);
    tracing = h(Er, { optional: !0 });
    disableScheduling = h(ya, { optional: !0 }) ?? !1;
    zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
    subscriptions = new H();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(Ko) : null;
    scheduleInRootZone =
      !this.zonelessEnabled && this.zoneIsDefined && (h(Ea, { optional: !0 }) ?? !1);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = !1;
    runningTick = !1;
    pendingRenderTaskId = null;
    constructor() {
      this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          this.runningTick || this.cleanup();
        })
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled && (this.ngZone instanceof Jo || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      let r = !1;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 6: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 12: {
          (this.appRef.dirtyFlags |= 16), (r = !0);
          break;
        }
        case 13: {
          (this.appRef.dirtyFlags |= 2), (r = !0);
          break;
        }
        case 11: {
          r = !0;
          break;
        }
        case 9:
        case 8:
        case 7:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (
        ((this.appRef.tracingSnapshot =
          this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
        !this.shouldScheduleTick(r))
      )
        return;
      let o = this.useMicrotaskScheduler ? td : df;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() => o(() => this.tick())))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              o(() => this.tick())
            ));
    }
    shouldScheduleTick(n) {
      return !(
        (this.disableScheduling && !n) ||
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(Ko + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        this.taskService.remove(n), this.applicationErrorHandler(r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        td(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
function qy() {
  return (typeof $localize < 'u' && $localize.locale) || Cr;
}
var wc = new y('', {
  providedIn: 'root',
  factory: () => h(wc, { optional: !0, skipSelf: !0 }) || qy(),
});
function ht(e) {
  return nu(e);
}
var op = class {
  [re];
  constructor(t) {
    this[re] = t;
  }
  destroy() {
    this[re].destroy();
  }
};
var ap = Symbol('InputSignalNode#UNSET'),
  tE = j(g({}, Xr), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      Zt(e, t);
    },
  });
function cp(e, t) {
  let n = Object.create(tE);
  (n.value = e), (n.transformFn = t?.transform);
  function r() {
    if ((Fn(n), n.value === ap)) {
      let o = null;
      throw new v(-950, o);
    }
    return n.value;
  }
  return (r[re] = n), r;
}
var nE = new y('');
nE.__NG_ELEMENT_ID__ = (e) => {
  let t = Te();
  if (t === null) throw new v(204, !1);
  if (t.type & 2) return t.value;
  if (e & 8) return null;
  throw new v(204, !1);
};
function ip(e, t) {
  return cp(e, t);
}
function rE(e) {
  return cp(ap, e);
}
var lp = ((ip.required = rE), ip);
var Dc = new y(''),
  oE = new y('');
function Sr(e) {
  return !e.moduleRef;
}
function iE(e) {
  let t = Sr(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(B);
  return n.run(() => {
    Sr(e) ? e.r3Injector.resolveInjectorInitializers() : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(we),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({ next: r });
      }),
      Sr(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Dc);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Dc);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          pr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return aE(r, n, () => {
      let i = t.get(We),
        s = i.add(),
        a = t.get(gc);
      return (
        a.runInitializers(),
        a.donePromise
          .then(() => {
            let c = t.get(wc, Cr);
            if ((Kf(c || Cr), !t.get(oE, !0)))
              return Sr(e) ? t.get($t) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
            if (Sr(e)) {
              let u = t.get($t);
              return e.rootComponent !== void 0 && u.bootstrap(e.rootComponent), u;
            } else return sE?.(e.moduleRef, e.allPlatformModules), e.moduleRef;
          })
          .finally(() => void i.remove(s))
      );
    });
  });
}
var sE;
function aE(e, t, n) {
  try {
    let r = n();
    return Dr(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e(r)), r);
  }
}
var Ci = null;
function cE(e = [], t) {
  return Oe.create({
    name: t,
    providers: [
      { provide: Kn, useValue: 'platform' },
      { provide: Dc, useValue: new Set([() => (Ci = null)]) },
      ...e,
    ],
  });
}
function lE(e = []) {
  if (Ci) return Ci;
  let t = cE(e);
  return (Ci = t), Zf(), uE(t), t;
}
function uE(e) {
  let t = e.get(ui, null);
  ee(e, () => {
    t?.forEach((n) => n());
  });
}
var up = (() => {
  class e {
    static __NG_ELEMENT_ID__ = dE;
  }
  return e;
})();
function dE(e) {
  return fE(Te(), $(), (e & 16) === 16);
}
function fE(e, t, n) {
  if (xt(e) && !n) {
    let r = Fe(e.index, t);
    return new Ht(r, r);
  } else if (e.type & 175) {
    let r = t[ye];
    return new Ht(r, t);
  }
  return null;
}
function dp(e) {
  let { rootComponent: t, appProviders: n, platformProviders: r, platformRef: o } = e;
  F(8);
  try {
    let i = o?.injector ?? lE(r),
      s = [yc({}), { provide: Tt, useExisting: rp }, Bu, ...(n || [])],
      a = new vr({ providers: s, parent: i, debugName: '', runEnvironmentInitializers: !1 });
    return iE({ r3Injector: a.injector, platformInjector: i, rootComponent: t });
  } catch (i) {
    return Promise.reject(i);
  } finally {
    F(9);
  }
}
var hp = null;
function Je() {
  return hp;
}
function bc(e) {
  hp ??= e;
}
var Tr = class {},
  Sc = (() => {
    class e {
      historyGo(n) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(gp), providedIn: 'platform' });
    }
    return e;
  })();
var gp = (() => {
  class e extends Sc {
    _location;
    _history;
    _doc = h(G);
    constructor() {
      super(), (this._location = window.location), (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return Je().getBaseHref(this._doc);
    }
    onPopState(n) {
      let r = Je().getGlobalEventTarget(this._doc, 'window');
      return r.addEventListener('popstate', n, !1), () => r.removeEventListener('popstate', n);
    }
    onHashChange(n) {
      let r = Je().getGlobalEventTarget(this._doc, 'window');
      return r.addEventListener('hashchange', n, !1), () => r.removeEventListener('hashchange', n);
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(n) {
      this._location.pathname = n;
    }
    pushState(n, r, o) {
      this._history.pushState(n, r, o);
    }
    replaceState(n, r, o) {
      this._history.replaceState(n, r, o);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(n = 0) {
      this._history.go(n);
    }
    getState() {
      return this._history.state;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = E({ token: e, factory: () => new e(), providedIn: 'platform' });
  }
  return e;
})();
function mp(e, t) {
  return e
    ? t
      ? e.endsWith('/')
        ? t.startsWith('/')
          ? e + t.slice(1)
          : e + t
        : t.startsWith('/')
        ? e + t
        : `${e}/${t}`
      : e
    : t;
}
function fp(e) {
  let t = e.search(/#|\?|$/);
  return e[t - 1] === '/' ? e.slice(0, t - 1) + e.slice(t) : e;
}
function mt(e) {
  return e && e[0] !== '?' ? `?${e}` : e;
}
var bi = (() => {
    class e {
      historyGo(n) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(yp), providedIn: 'root' });
    }
    return e;
  })(),
  vp = new y(''),
  yp = (() => {
    class e extends bi {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref =
            r ?? this._platformLocation.getBaseHrefFromDOM() ?? h(G).location?.origin ?? '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return mp(this._baseHref, n);
      }
      path(n = !1) {
        let r = this._platformLocation.pathname + mt(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + mt(i));
        this._platformLocation.pushState(n, r, s);
      }
      replaceState(n, r, o, i) {
        let s = this.prepareExternalUrl(o + mt(i));
        this._platformLocation.replaceState(n, r, s);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(b(Sc), b(vp, 8));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Dn = (() => {
    class e {
      _subject = new W();
      _basePath;
      _locationStrategy;
      _urlChangeListeners = [];
      _urlChangeSubscription = null;
      constructor(n) {
        this._locationStrategy = n;
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = gE(fp(pp(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.next({ url: this.path(!0), pop: !0, state: o.state, type: o.type });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = '') {
        return this.path() == this.normalize(n + mt(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(hE(this._basePath, pp(n)));
      }
      prepareExternalUrl(n) {
        return n && n[0] !== '/' && (n = '/' + n), this._locationStrategy.prepareExternalUrl(n);
      }
      go(n, r = '', o = null) {
        this._locationStrategy.pushState(o, '', n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + mt(r)), o);
      }
      replaceState(n, r = '', o = null) {
        this._locationStrategy.replaceState(o, '', n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + mt(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = '', r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({ next: n, error: r ?? void 0, complete: o ?? void 0 });
      }
      static normalizeQueryParams = mt;
      static joinWithSlash = mp;
      static stripTrailingSlash = fp;
      static ɵfac = function (r) {
        return new (r || e)(b(bi));
      };
      static ɵprov = E({ token: e, factory: () => pE(), providedIn: 'root' });
    }
    return e;
  })();
function pE() {
  return new Dn(b(bi));
}
function hE(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : t;
}
function pp(e) {
  return e.replace(/\/index.html$/, '');
}
function gE(e) {
  if (new RegExp('^(https?:)?//').test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
function Tc(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(';')) {
    let r = n.indexOf('='),
      [o, i] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
    if (o.trim() === t) return decodeURIComponent(i);
  }
  return null;
}
var _r = class {};
var Ep = 'browser';
var Mr = class {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    manager;
  },
  Si = (() => {
    class e extends Mr {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o, i) {
        return n.addEventListener(r, o, i), () => this.removeEventListener(n, r, o, i);
      }
      removeEventListener(n, r, o, i) {
        return n.removeEventListener(r, o, i);
      }
      static ɵfac = function (r) {
        return new (r || e)(b(G));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  _i = new y(''),
  xc = (() => {
    class e {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(n, r) {
        (this._zone = r),
          n.forEach((s) => {
            s.manager = this;
          });
        let o = n.filter((s) => !(s instanceof Si));
        this._plugins = o.slice().reverse();
        let i = n.find((s) => s instanceof Si);
        i && this._plugins.push(i);
      }
      addEventListener(n, r, o, i) {
        return this._findPluginFor(r).addEventListener(n, r, o, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((i) => i.supports(n))), !r)) throw new v(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
      static ɵfac = function (r) {
        return new (r || e)(b(_i), b(B));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  _c = 'ng-app-id';
function Ip(e) {
  for (let t of e) t.remove();
}
function wp(e, t) {
  let n = t.createElement('style');
  return (n.textContent = e), n;
}
function mE(e, t, n, r) {
  let o = e.head?.querySelectorAll(`style[${_c}="${t}"],link[${_c}="${t}"]`);
  if (o)
    for (let i of o)
      i.removeAttribute(_c),
        i instanceof HTMLLinkElement
          ? r.set(i.href.slice(i.href.lastIndexOf('/') + 1), { usage: 0, elements: [i] })
          : i.textContent && n.set(i.textContent, { usage: 0, elements: [i] });
}
function Nc(e, t) {
  let n = t.createElement('link');
  return n.setAttribute('rel', 'stylesheet'), n.setAttribute('href', e), n;
}
var Ac = (() => {
    class e {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      constructor(n, r, o, i = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          mE(n, r, this.inline, this.external),
          this.hosts.add(n.head);
      }
      addStyles(n, r) {
        for (let o of n) this.addUsage(o, this.inline, wp);
        r?.forEach((o) => this.addUsage(o, this.external, Nc));
      }
      removeStyles(n, r) {
        for (let o of n) this.removeUsage(o, this.inline);
        r?.forEach((o) => this.removeUsage(o, this.external));
      }
      addUsage(n, r, o) {
        let i = r.get(n);
        i
          ? i.usage++
          : r.set(n, {
              usage: 1,
              elements: [...this.hosts].map((s) => this.addElement(s, o(n, this.doc))),
            });
      }
      removeUsage(n, r) {
        let o = r.get(n);
        o && (o.usage--, o.usage <= 0 && (Ip(o.elements), r.delete(n)));
      }
      ngOnDestroy() {
        for (let [, { elements: n }] of [...this.inline, ...this.external]) Ip(n);
        this.hosts.clear();
      }
      addHost(n) {
        this.hosts.add(n);
        for (let [r, { elements: o }] of this.inline) o.push(this.addElement(n, wp(r, this.doc)));
        for (let [r, { elements: o }] of this.external) o.push(this.addElement(n, Nc(r, this.doc)));
      }
      removeHost(n) {
        this.hosts.delete(n);
      }
      addElement(n, r) {
        return this.nonce && r.setAttribute('nonce', this.nonce), n.appendChild(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(b(G), b(li), b(di, 8), b(In));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Mc = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/Math/MathML',
  },
  Oc = /%COMP%/g;
var Cp = '%COMP%',
  vE = `_nghost-${Cp}`,
  yE = `_ngcontent-${Cp}`,
  EE = !0,
  IE = new y('', { providedIn: 'root', factory: () => EE });
function wE(e) {
  return yE.replace(Oc, e);
}
function DE(e) {
  return vE.replace(Oc, e);
}
function bp(e, t) {
  return t.map((n) => n.replace(Oc, e));
}
var kc = (() => {
    class e {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      platformId;
      ngZone;
      nonce;
      tracingService;
      rendererByCompId = new Map();
      defaultRenderer;
      platformIsServer;
      constructor(n, r, o, i, s, a, c, l = null, u = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = i),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = l),
          (this.tracingService = u),
          (this.platformIsServer = !1),
          (this.defaultRenderer = new Nr(n, s, c, this.platformIsServer, this.tracingService));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        let o = this.getOrCreateRenderer(n, r);
        return o instanceof Ti ? o.applyToHost(n) : o instanceof Rr && o.applyStyles(), o;
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          i = o.get(r.id);
        if (!i) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer,
            p = this.tracingService;
          switch (r.encapsulation) {
            case Ze.Emulated:
              i = new Ti(c, l, r, this.appId, u, s, a, d, p);
              break;
            case Ze.ShadowDom:
              return new Rc(c, l, n, r, s, a, this.nonce, d, p);
            default:
              i = new Rr(c, l, r, u, s, a, d, p);
              break;
          }
          o.set(r.id, i);
        }
        return i;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      componentReplaced(n) {
        this.rendererByCompId.delete(n);
      }
      static ɵfac = function (r) {
        return new (r || e)(b(xc), b(Ac), b(li), b(IE), b(G), b(In), b(B), b(di), b(Er, 8));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Nr = class {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = !0;
    constructor(t, n, r, o, i) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = o),
        (this.tracingService = i);
    }
    destroy() {}
    destroyNode = null;
    createElement(t, n) {
      return n ? this.doc.createElementNS(Mc[n] || n, t) : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (Dp(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, r) {
      t && (Dp(t) ? t.content : t).insertBefore(n, r);
    }
    removeChild(t, n) {
      n.remove();
    }
    selectRootElement(t, n) {
      let r = typeof t == 'string' ? this.doc.querySelector(t) : t;
      if (!r) throw new v(-5104, !1);
      return n || (r.textContent = ''), r;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, r, o) {
      if (o) {
        n = o + ':' + n;
        let i = Mc[o];
        i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
      } else t.setAttribute(n, r);
    }
    removeAttribute(t, n, r) {
      if (r) {
        let o = Mc[r];
        o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, r, o) {
      o & (Qe.DashCase | Qe.Important)
        ? t.style.setProperty(n, r, o & Qe.Important ? 'important' : '')
        : (t.style[n] = r);
    }
    removeStyle(t, n, r) {
      r & Qe.DashCase ? t.style.removeProperty(n) : (t.style[n] = '');
    }
    setProperty(t, n, r) {
      t != null && (t[n] = r);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, r, o) {
      if (typeof t == 'string' && ((t = Je().getGlobalEventTarget(this.doc, t)), !t))
        throw new v(5102, !1);
      let i = this.decoratePreventDefault(r);
      return (
        this.tracingService?.wrapEventListener &&
          (i = this.tracingService.wrapEventListener(t, n, i)),
        this.eventManager.addEventListener(t, n, i, o)
      );
    }
    decoratePreventDefault(t) {
      return (n) => {
        if (n === '__ngUnwrap__') return t;
        t(n) === !1 && n.preventDefault();
      };
    }
  };
function Dp(e) {
  return e.tagName === 'TEMPLATE' && e.content !== void 0;
}
var Rc = class extends Nr {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(t, n, r, o, i, s, a, c, l) {
      super(t, i, s, c, l),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: 'open' })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let u = o.styles;
      u = bp(o.id, u);
      for (let p of u) {
        let f = document.createElement('style');
        a && f.setAttribute('nonce', a), (f.textContent = p), this.shadowRoot.appendChild(f);
      }
      let d = o.getExternalStyles?.();
      if (d)
        for (let p of d) {
          let f = Nc(p, i);
          a && f.setAttribute('nonce', a), this.shadowRoot.appendChild(f);
        }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
    }
    removeChild(t, n) {
      return super.removeChild(null, n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Rr = class extends Nr {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(t, n, r, o, i, s, a, c, l) {
      super(t, i, s, a, c), (this.sharedStylesHost = n), (this.removeStylesOnCompDestroy = o);
      let u = r.styles;
      (this.styles = l ? bp(l, u) : u), (this.styleUrls = r.getExternalStyles?.(l));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        mn.size === 0 &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  Ti = class extends Rr {
    contentAttr;
    hostAttr;
    constructor(t, n, r, o, i, s, a, c, l) {
      let u = o + '-' + r.id;
      super(t, n, r, i, s, a, c, l, u), (this.contentAttr = wE(u)), (this.hostAttr = DE(u));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, '');
    }
    createElement(t, n) {
      let r = super.createElement(t, n);
      return super.setAttribute(r, this.contentAttr, ''), r;
    }
  };
var Mi = class e extends Tr {
    supportsDOMEvents = !0;
    static makeCurrent() {
      bc(new e());
    }
    onAndCancel(t, n, r, o) {
      return (
        t.addEventListener(n, r, o),
        () => {
          t.removeEventListener(n, r, o);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === 'window' ? window : n === 'document' ? t : n === 'body' ? t.body : null;
    }
    getBaseHref(t) {
      let n = CE();
      return n == null ? null : bE(n);
    }
    resetBaseElement() {
      xr = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Tc(document.cookie, t);
    }
  },
  xr = null;
function CE() {
  return (xr = xr || document.head.querySelector('base')), xr ? xr.getAttribute('href') : null;
}
function bE(e) {
  return new URL(e, document.baseURI).pathname;
}
var SE = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Sp = ['alt', 'control', 'meta', 'shift'],
  TE = {
    '\b': 'Backspace',
    '	': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  _E = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  Tp = (() => {
    class e extends Mr {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o, i) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Je().onAndCancel(n, s.domEventName, a, i));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split('.'),
          o = r.shift();
        if (r.length === 0 || !(o === 'keydown' || o === 'keyup')) return null;
        let i = e._normalizeKey(r.pop()),
          s = '',
          a = r.indexOf('code');
        if (
          (a > -1 && (r.splice(a, 1), (s = 'code.')),
          Sp.forEach((l) => {
            let u = r.indexOf(l);
            u > -1 && (r.splice(u, 1), (s += l + '.'));
          }),
          (s += i),
          r.length != 0 || i.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(n, r) {
        let o = TE[n.key] || n.key,
          i = '';
        return (
          r.indexOf('code.') > -1 && ((o = n.code), (i = 'code.')),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === ' ' ? (o = 'space') : o === '.' && (o = 'dot'),
              Sp.forEach((s) => {
                if (s !== o) {
                  let a = _E[s];
                  a(n) && (i += s + '.');
                }
              }),
              (i += o),
              i === r)
        );
      }
      static eventCallback(n, r, o) {
        return (i) => {
          e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
        };
      }
      static _normalizeKey(n) {
        return n === 'esc' ? 'escape' : n;
      }
      static ɵfac = function (r) {
        return new (r || e)(b(G));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function Pc(e, t, n) {
  let r = g({ rootComponent: e, platformRef: n?.platformRef }, ME(t));
  return dp(r);
}
function ME(e) {
  return { appProviders: [...OE, ...(e?.providers ?? [])], platformProviders: AE };
}
function NE() {
  Mi.makeCurrent();
}
function RE() {
  return new ke();
}
function xE() {
  return Ja(document), document;
}
var AE = [
  { provide: In, useValue: Ep },
  { provide: ui, useValue: NE, multi: !0 },
  { provide: G, useFactory: xE },
];
var OE = [
  { provide: Kn, useValue: 'root' },
  { provide: ke, useFactory: RE },
  { provide: _i, useClass: Si, multi: !0, deps: [G] },
  { provide: _i, useClass: Tp, multi: !0, deps: [G] },
  kc,
  Ac,
  xc,
  { provide: Vt, useExisting: kc },
  { provide: _r, useClass: SE },
  [],
];
var _p = (() => {
  class e {
    _doc;
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || '';
    }
    static ɵfac = function (r) {
      return new (r || e)(b(G));
    };
    static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
  }
  return e;
})();
var D = 'primary',
  zr = Symbol('RouteTitle'),
  Vc = class {
    params;
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Mn(e) {
  return new Vc(e);
}
function PE(e, t, n) {
  let r = n.path.split('/');
  if (r.length > e.length || (n.pathMatch === 'full' && (t.hasChildren() || r.length < e.length)))
    return null;
  let o = {};
  for (let i = 0; i < r.length; i++) {
    let s = r[i],
      a = e[i];
    if (s[0] === ':') o[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, r.length), posParams: o };
}
function LE(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!Ve(e[n], t[n])) return !1;
  return !0;
}
function Ve(e, t) {
  let n = e ? Uc(e) : void 0,
    r = t ? Uc(t) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let o;
  for (let i = 0; i < n.length; i++) if (((o = n[i]), !Pp(e[o], t[o]))) return !1;
  return !0;
}
function Uc(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function Pp(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      r = [...t].sort();
    return n.every((o, i) => r[i] === o);
  } else return e === t;
}
function Lp(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function tt(e) {
  return ys(e) ? e : Dr(e) ? V(Promise.resolve(e)) : I(e);
}
var FE = { exact: jp, subset: Hp },
  Fp = { exact: jE, subset: HE, ignored: () => !0 };
function Mp(e, t, n) {
  return (
    FE[n.paths](e.root, t.root, n.matrixParams) &&
    Fp[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === 'exact' && e.fragment !== t.fragment)
  );
}
function jE(e, t) {
  return Ve(e, t);
}
function jp(e, t, n) {
  if (
    !zt(e.segments, t.segments) ||
    !xi(e.segments, t.segments, n) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let r in t.children) if (!e.children[r] || !jp(e.children[r], t.children[r], n)) return !1;
  return !0;
}
function HE(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length && Object.keys(t).every((n) => Pp(e[n], t[n]))
  );
}
function Hp(e, t, n) {
  return Vp(e, t, t.segments, n);
}
function Vp(e, t, n, r) {
  if (e.segments.length > n.length) {
    let o = e.segments.slice(0, n.length);
    return !(!zt(o, n) || t.hasChildren() || !xi(o, n, r));
  } else if (e.segments.length === n.length) {
    if (!zt(e.segments, n) || !xi(e.segments, n, r)) return !1;
    for (let o in t.children) if (!e.children[o] || !Hp(e.children[o], t.children[o], r)) return !1;
    return !0;
  } else {
    let o = n.slice(0, e.segments.length),
      i = n.slice(e.segments.length);
    return !zt(e.segments, o) || !xi(e.segments, o, r) || !e.children[D]
      ? !1
      : Vp(e.children[D], t, i, r);
  }
}
function xi(e, t, n) {
  return t.every((r, o) => Fp[n](e[o].parameters, r.parameters));
}
var et = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(t = new k([], {}), n = {}, r = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return (this._queryParamMap ??= Mn(this.queryParams)), this._queryParamMap;
    }
    toString() {
      return $E.serialize(this);
    }
  },
  k = class {
    segments;
    children;
    parent = null;
    constructor(t, n) {
      (this.segments = t), (this.children = n), Object.values(n).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ai(this);
    }
  },
  Bt = class {
    path;
    parameters;
    _parameterMap;
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return (this._parameterMap ??= Mn(this.parameters)), this._parameterMap;
    }
    toString() {
      return $p(this);
    }
  };
function VE(e, t) {
  return zt(e, t) && e.every((n, r) => Ve(n.parameters, t[r].parameters));
}
function zt(e, t) {
  return e.length !== t.length ? !1 : e.every((n, r) => n.path === t[r].path);
}
function UE(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      r === D && (n = n.concat(t(o, r)));
    }),
    Object.entries(e.children).forEach(([r, o]) => {
      r !== D && (n = n.concat(t(o, r)));
    }),
    n
  );
}
var zi = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => new Nn(), providedIn: 'root' });
    }
    return e;
  })(),
  Nn = class {
    parse(t) {
      let n = new Bc(t);
      return new et(n.parseRootSegment(), n.parseQueryParams(), n.parseFragment());
    }
    serialize(t) {
      let n = `/${Ar(t.root, !0)}`,
        r = qE(t.queryParams),
        o = typeof t.fragment == 'string' ? `#${BE(t.fragment)}` : '';
      return `${n}${r}${o}`;
    }
  },
  $E = new Nn();
function Ai(e) {
  return e.segments.map((t) => $p(t)).join('/');
}
function Ar(e, t) {
  if (!e.hasChildren()) return Ai(e);
  if (t) {
    let n = e.children[D] ? Ar(e.children[D], !1) : '',
      r = [];
    return (
      Object.entries(e.children).forEach(([o, i]) => {
        o !== D && r.push(`${o}:${Ar(i, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join('//')})` : n
    );
  } else {
    let n = UE(e, (r, o) => (o === D ? [Ar(e.children[D], !1)] : [`${o}:${Ar(r, !1)}`]));
    return Object.keys(e.children).length === 1 && e.children[D] != null
      ? `${Ai(e)}/${n[0]}`
      : `${Ai(e)}/(${n.join('//')})`;
  }
}
function Up(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function Ni(e) {
  return Up(e).replace(/%3B/gi, ';');
}
function BE(e) {
  return encodeURI(e);
}
function $c(e) {
  return Up(e).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function Oi(e) {
  return decodeURIComponent(e);
}
function Np(e) {
  return Oi(e.replace(/\+/g, '%20'));
}
function $p(e) {
  return `${$c(e.path)}${zE(e.parameters)}`;
}
function zE(e) {
  return Object.entries(e)
    .map(([t, n]) => `;${$c(t)}=${$c(n)}`)
    .join('');
}
function qE(e) {
  let t = Object.entries(e)
    .map(([n, r]) =>
      Array.isArray(r) ? r.map((o) => `${Ni(n)}=${Ni(o)}`).join('&') : `${Ni(n)}=${Ni(r)}`
    )
    .filter((n) => n);
  return t.length ? `?${t.join('&')}` : '';
}
var GE = /^[^\/()?;#]+/;
function Lc(e) {
  let t = e.match(GE);
  return t ? t[0] : '';
}
var WE = /^[^\/()?;=#]+/;
function ZE(e) {
  let t = e.match(WE);
  return t ? t[0] : '';
}
var QE = /^[^=?&#]+/;
function YE(e) {
  let t = e.match(QE);
  return t ? t[0] : '';
}
var KE = /^[^&#]+/;
function JE(e) {
  let t = e.match(KE);
  return t ? t[0] : '';
}
var Bc = class {
  url;
  remaining;
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional('/'),
      this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
        ? new k([], {})
        : new k([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional('?'))
      do this.parseQueryParam(t);
      while (this.consumeOptional('&'));
    return t;
  }
  parseFragment() {
    return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren() {
    if (this.remaining === '') return {};
    this.consumeOptional('/');
    let t = [];
    for (
      this.peekStartsWith('(') || t.push(this.parseSegment());
      this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

    )
      this.capture('/'), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith('/(') && (this.capture('/'), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith('(') && (r = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (r[D] = new k(t, n)),
      r
    );
  }
  parseSegment() {
    let t = Lc(this.remaining);
    if (t === '' && this.peekStartsWith(';')) throw new v(4009, !1);
    return this.capture(t), new Bt(Oi(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(';'); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = ZE(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = Lc(this.remaining);
      o && ((r = o), this.capture(r));
    }
    t[Oi(n)] = Oi(r);
  }
  parseQueryParam(t) {
    let n = YE(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let s = JE(this.remaining);
      s && ((r = s), this.capture(r));
    }
    let o = Np(n),
      i = Np(r);
    if (t.hasOwnProperty(o)) {
      let s = t[o];
      Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
    } else t[o] = i;
  }
  parseParens(t) {
    let n = {};
    for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
      let r = Lc(this.remaining),
        o = this.remaining[r.length];
      if (o !== '/' && o !== ')' && o !== ';') throw new v(4010, !1);
      let i;
      r.indexOf(':') > -1
        ? ((i = r.slice(0, r.indexOf(':'))), this.capture(i), this.capture(':'))
        : t && (i = D);
      let s = this.parseChildren();
      (n[i ?? D] = Object.keys(s).length === 1 && s[D] ? s[D] : new k([], s)),
        this.consumeOptional('//');
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new v(4011, !1);
  }
};
function Bp(e) {
  return e.segments.length > 0 ? new k([], { [D]: e }) : e;
}
function zp(e) {
  let t = {};
  for (let [r, o] of Object.entries(e.children)) {
    let i = zp(o);
    if (r === D && i.segments.length === 0 && i.hasChildren())
      for (let [s, a] of Object.entries(i.children)) t[s] = a;
    else (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
  }
  let n = new k(e.segments, t);
  return XE(n);
}
function XE(e) {
  if (e.numberOfChildren === 1 && e.children[D]) {
    let t = e.children[D];
    return new k(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function Rn(e) {
  return e instanceof et;
}
function eI(e, t, n = null, r = null) {
  let o = qp(e);
  return Gp(o, t, n, r);
}
function qp(e) {
  let t;
  function n(i) {
    let s = {};
    for (let c of i.children) {
      let l = n(c);
      s[c.outlet] = l;
    }
    let a = new k(i.url, s);
    return i === e && (t = a), a;
  }
  let r = n(e.root),
    o = Bp(r);
  return t ?? o;
}
function Gp(e, t, n, r) {
  let o = e;
  for (; o.parent; ) o = o.parent;
  if (t.length === 0) return Fc(o, o, o, n, r);
  let i = tI(t);
  if (i.toRoot()) return Fc(o, o, new k([], {}), n, r);
  let s = nI(i, o, e),
    a = s.processChildren
      ? kr(s.segmentGroup, s.index, i.commands)
      : Zp(s.segmentGroup, s.index, i.commands);
  return Fc(o, s.segmentGroup, a, n, r);
}
function ki(e) {
  return typeof e == 'object' && e != null && !e.outlets && !e.segmentPath;
}
function Fr(e) {
  return typeof e == 'object' && e != null && e.outlets;
}
function Fc(e, t, n, r, o) {
  let i = {};
  r &&
    Object.entries(r).forEach(([c, l]) => {
      i[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
    });
  let s;
  e === t ? (s = n) : (s = Wp(e, t, n));
  let a = Bp(zp(s));
  return new et(a, i, o);
}
function Wp(e, t, n) {
  let r = {};
  return (
    Object.entries(e.children).forEach(([o, i]) => {
      i === t ? (r[o] = n) : (r[o] = Wp(i, t, n));
    }),
    new k(e.segments, r)
  );
}
var Pi = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(t, n, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = n),
      (this.commands = r),
      t && r.length > 0 && ki(r[0]))
    )
      throw new v(4003, !1);
    let o = r.find(Fr);
    if (o && o !== Lp(r)) throw new v(4004, !1);
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
  }
};
function tI(e) {
  if (typeof e[0] == 'string' && e.length === 1 && e[0] === '/') return new Pi(!0, 0, e);
  let t = 0,
    n = !1,
    r = e.reduce((o, i, s) => {
      if (typeof i == 'object' && i != null) {
        if (i.outlets) {
          let a = {};
          return (
            Object.entries(i.outlets).forEach(([c, l]) => {
              a[c] = typeof l == 'string' ? l.split('/') : l;
            }),
            [...o, { outlets: a }]
          );
        }
        if (i.segmentPath) return [...o, i.segmentPath];
      }
      return typeof i != 'string'
        ? [...o, i]
        : s === 0
        ? (i.split('/').forEach((a, c) => {
            (c == 0 && a === '.') ||
              (c == 0 && a === '' ? (n = !0) : a === '..' ? t++ : a != '' && o.push(a));
          }),
          o)
        : [...o, i];
    }, []);
  return new Pi(n, t, r);
}
var Sn = class {
  segmentGroup;
  processChildren;
  index;
  constructor(t, n, r) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
  }
};
function nI(e, t, n) {
  if (e.isAbsolute) return new Sn(t, !0, 0);
  if (!n) return new Sn(t, !1, NaN);
  if (n.parent === null) return new Sn(n, !0, 0);
  let r = ki(e.commands[0]) ? 0 : 1,
    o = n.segments.length - 1 + r;
  return rI(n, o, e.numberOfDoubleDots);
}
function rI(e, t, n) {
  let r = e,
    o = t,
    i = n;
  for (; i > o; ) {
    if (((i -= o), (r = r.parent), !r)) throw new v(4005, !1);
    o = r.segments.length;
  }
  return new Sn(r, !1, o - i);
}
function oI(e) {
  return Fr(e[0]) ? e[0].outlets : { [D]: e };
}
function Zp(e, t, n) {
  if (((e ??= new k([], {})), e.segments.length === 0 && e.hasChildren())) return kr(e, t, n);
  let r = iI(e, t, n),
    o = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < e.segments.length) {
    let i = new k(e.segments.slice(0, r.pathIndex), {});
    return (i.children[D] = new k(e.segments.slice(r.pathIndex), e.children)), kr(i, 0, o);
  } else
    return r.match && o.length === 0
      ? new k(e.segments, {})
      : r.match && !e.hasChildren()
      ? zc(e, t, n)
      : r.match
      ? kr(e, 0, o)
      : zc(e, t, n);
}
function kr(e, t, n) {
  if (n.length === 0) return new k(e.segments, {});
  {
    let r = oI(n),
      o = {};
    if (
      Object.keys(r).some((i) => i !== D) &&
      e.children[D] &&
      e.numberOfChildren === 1 &&
      e.children[D].segments.length === 0
    ) {
      let i = kr(e.children[D], t, n);
      return new k(e.segments, i.children);
    }
    return (
      Object.entries(r).forEach(([i, s]) => {
        typeof s == 'string' && (s = [s]), s !== null && (o[i] = Zp(e.children[i], t, s));
      }),
      Object.entries(e.children).forEach(([i, s]) => {
        r[i] === void 0 && (o[i] = s);
      }),
      new k(e.segments, o)
    );
  }
}
function iI(e, t, n) {
  let r = 0,
    o = t,
    i = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; o < e.segments.length; ) {
    if (r >= n.length) return i;
    let s = e.segments[o],
      a = n[r];
    if (Fr(a)) break;
    let c = `${a}`,
      l = r < n.length - 1 ? n[r + 1] : null;
    if (o > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!xp(c, l, s)) return i;
      r += 2;
    } else {
      if (!xp(c, {}, s)) return i;
      r++;
    }
    o++;
  }
  return { match: !0, pathIndex: o, commandIndex: r };
}
function zc(e, t, n) {
  let r = e.segments.slice(0, t),
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (Fr(i)) {
      let c = sI(i.outlets);
      return new k(r, c);
    }
    if (o === 0 && ki(n[0])) {
      let c = e.segments[t];
      r.push(new Bt(c.path, Rp(n[0]))), o++;
      continue;
    }
    let s = Fr(i) ? i.outlets[D] : `${i}`,
      a = o < n.length - 1 ? n[o + 1] : null;
    s && a && ki(a) ? (r.push(new Bt(s, Rp(a))), (o += 2)) : (r.push(new Bt(s, {})), o++);
  }
  return new k(r, {});
}
function sI(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, r]) => {
      typeof r == 'string' && (r = [r]), r !== null && (t[n] = zc(new k([], {}), 0, r));
    }),
    t
  );
}
function Rp(e) {
  let t = {};
  return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
}
function xp(e, t, n) {
  return e == n.path && Ve(t, n.parameters);
}
var Pr = 'imperative',
  J = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = 'NavigationStart'),
      (e[(e.NavigationEnd = 1)] = 'NavigationEnd'),
      (e[(e.NavigationCancel = 2)] = 'NavigationCancel'),
      (e[(e.NavigationError = 3)] = 'NavigationError'),
      (e[(e.RoutesRecognized = 4)] = 'RoutesRecognized'),
      (e[(e.ResolveStart = 5)] = 'ResolveStart'),
      (e[(e.ResolveEnd = 6)] = 'ResolveEnd'),
      (e[(e.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
      (e[(e.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
      (e[(e.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
      (e[(e.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
      (e[(e.ChildActivationStart = 11)] = 'ChildActivationStart'),
      (e[(e.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
      (e[(e.ActivationStart = 13)] = 'ActivationStart'),
      (e[(e.ActivationEnd = 14)] = 'ActivationEnd'),
      (e[(e.Scroll = 15)] = 'Scroll'),
      (e[(e.NavigationSkipped = 16)] = 'NavigationSkipped'),
      e
    );
  })(J || {}),
  De = class {
    id;
    url;
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  xn = class extends De {
    type = J.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(t, n, r = 'imperative', o = null) {
      super(t, n), (this.navigationTrigger = r), (this.restoredState = o);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  vt = class extends De {
    urlAfterRedirects;
    type = J.NavigationEnd;
    constructor(t, n, r) {
      super(t, n), (this.urlAfterRedirects = r);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  ue = (function (e) {
    return (
      (e[(e.Redirect = 0)] = 'Redirect'),
      (e[(e.SupersededByNewNavigation = 1)] = 'SupersededByNewNavigation'),
      (e[(e.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
      (e[(e.GuardRejected = 3)] = 'GuardRejected'),
      (e[(e.Aborted = 4)] = 'Aborted'),
      e
    );
  })(ue || {}),
  Li = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] = 'IgnoredByUrlHandlingStrategy'),
      e
    );
  })(Li || {}),
  Xe = class extends De {
    reason;
    code;
    type = J.NavigationCancel;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  yt = class extends De {
    reason;
    code;
    type = J.NavigationSkipped;
    constructor(t, n, r, o) {
      super(t, n), (this.reason = r), (this.code = o);
    }
  },
  jr = class extends De {
    error;
    target;
    type = J.NavigationError;
    constructor(t, n, r, o) {
      super(t, n), (this.error = r), (this.target = o);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Fi = class extends De {
    urlAfterRedirects;
    state;
    type = J.RoutesRecognized;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  qc = class extends De {
    urlAfterRedirects;
    state;
    type = J.GuardsCheckStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Gc = class extends De {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = J.GuardsCheckEnd;
    constructor(t, n, r, o, i) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o), (this.shouldActivate = i);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Wc = class extends De {
    urlAfterRedirects;
    state;
    type = J.ResolveStart;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Zc = class extends De {
    urlAfterRedirects;
    state;
    type = J.ResolveEnd;
    constructor(t, n, r, o) {
      super(t, n), (this.urlAfterRedirects = r), (this.state = o);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Qc = class {
    route;
    type = J.RouteConfigLoadStart;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Yc = class {
    route;
    type = J.RouteConfigLoadEnd;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Kc = class {
    snapshot;
    type = J.ChildActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  Jc = class {
    snapshot;
    type = J.ChildActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  Xc = class {
    snapshot;
    type = J.ActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  el = class {
    snapshot;
    type = J.ActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  };
var Hr = class {},
  An = class {
    url;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.url = t), (this.navigationBehaviorOptions = n);
    }
  };
function aI(e) {
  return !(e instanceof Hr) && !(e instanceof An);
}
function cI(e, t) {
  return (
    e.providers && !e._injector && (e._injector = wr(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function Re(e) {
  return e.outlet || D;
}
function lI(e, t) {
  let n = e.filter((r) => Re(r) === t);
  return n.push(...e.filter((r) => Re(r) !== t)), n;
}
function kn(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var tl = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return kn(this.route?.snapshot) ?? this.rootInjector;
    }
    constructor(t) {
      (this.rootInjector = t), (this.children = new qr(this.rootInjector));
    }
  },
  qr = (() => {
    class e {
      rootInjector;
      contexts = new Map();
      constructor(n) {
        this.rootInjector = n;
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return r || ((r = new tl(this.rootInjector)), this.contexts.set(n, r)), r;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
      static ɵfac = function (r) {
        return new (r || e)(b(Q));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  ji = class {
    _root;
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = nl(t, this._root);
      return n ? n.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let n = nl(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = rl(t, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((o) => o.value).filter((o) => o !== t);
    }
    pathFromRoot(t) {
      return rl(t, this._root).map((n) => n.value);
    }
  };
function nl(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let r = nl(e, n);
    if (r) return r;
  }
  return null;
}
function rl(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let r = rl(e, n);
    if (r.length) return r.unshift(t), r;
  }
  return [];
}
var he = class {
  value;
  children;
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function bn(e) {
  let t = {};
  return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
}
var Hi = class extends ji {
  snapshot;
  constructor(t, n) {
    super(t), (this.snapshot = n), fl(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Qp(e) {
  let t = uI(e),
    n = new Z([new Bt('', {})]),
    r = new Z({}),
    o = new Z({}),
    i = new Z({}),
    s = new Z(''),
    a = new qt(n, r, i, s, o, D, e, t.root);
  return (a.snapshot = t.root), new Hi(new he(a, []), t);
}
function uI(e) {
  let t = {},
    n = {},
    r = {},
    i = new Tn([], t, r, '', n, D, e, null, {});
  return new Ui('', new he(i, []));
}
var qt = class {
  urlSubject;
  paramsSubject;
  queryParamsSubject;
  fragmentSubject;
  dataSubject;
  outlet;
  component;
  snapshot;
  _futureSnapshot;
  _routerState;
  _paramMap;
  _queryParamMap;
  title;
  url;
  params;
  queryParams;
  fragment;
  data;
  constructor(t, n, r, o, i, s, a, c) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = o),
      (this.dataSubject = i),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(R((l) => l[zr])) ?? I(void 0)),
      (this.url = t),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = o),
      (this.data = i);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (this._paramMap ??= this.params.pipe(R((t) => Mn(t)))), this._paramMap;
  }
  get queryParamMap() {
    return (this._queryParamMap ??= this.queryParams.pipe(R((t) => Mn(t)))), this._queryParamMap;
  }
  toString() {
    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
  }
};
function Vi(e, t, n = 'emptyOnly') {
  let r,
    { routeConfig: o } = e;
  return (
    t !== null &&
    (n === 'always' || o?.path === '' || (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: g(g({}, t.params), e.params),
          data: g(g({}, t.data), e.data),
          resolve: g(g(g(g({}, e.data), t.data), o?.data), e._resolvedData),
        })
      : (r = {
          params: g({}, e.params),
          data: g({}, e.data),
          resolve: g(g({}, e.data), e._resolvedData ?? {}),
        }),
    o && Kp(o) && (r.resolve[zr] = o.title),
    r
  );
}
var Tn = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    get title() {
      return this.data?.[zr];
    }
    constructor(t, n, r, o, i, s, a, c, l) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = o),
        (this.data = i),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = l);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= Mn(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (this._queryParamMap ??= Mn(this.queryParams)), this._queryParamMap;
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join('/'),
        n = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  Ui = class extends ji {
    url;
    constructor(t, n) {
      super(n), (this.url = t), fl(this, n);
    }
    toString() {
      return Yp(this._root);
    }
  };
function fl(e, t) {
  (t.value._routerState = e), t.children.forEach((n) => fl(e, n));
}
function Yp(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(Yp).join(', ')} } ` : '';
  return `${e.value}${t}`;
}
function jc(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      Ve(t.queryParams, n.queryParams) || e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      Ve(t.params, n.params) || e.paramsSubject.next(n.params),
      LE(t.url, n.url) || e.urlSubject.next(n.url),
      Ve(t.data, n.data) || e.dataSubject.next(n.data);
  } else (e.snapshot = e._futureSnapshot), e.dataSubject.next(e._futureSnapshot.data);
}
function ol(e, t) {
  let n = Ve(e.params, t.params) && VE(e.url, t.url),
    r = !e.parent != !t.parent;
  return n && !r && (!e.parent || ol(e.parent, t.parent));
}
function Kp(e) {
  return typeof e.title == 'string' || e.title === null;
}
var dI = new y(''),
  Jp = (() => {
    class e {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = D;
      activateEvents = new ne();
      deactivateEvents = new ne();
      attachEvents = new ne();
      detachEvents = new ne();
      routerOutletData = lp();
      parentContexts = h(qr);
      location = h(vi);
      changeDetector = h(up);
      inputBinder = h(qi, { optional: !0 });
      supportsBindingToComponentInputs = !0;
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new v(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new v(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new v(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new v(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          s = n.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new il(n, a, o.injector, this.routerOutletData);
        (this.activated = o.createComponent(s, {
          index: o.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵdir = fc({
        type: e,
        selectors: [['router-outlet']],
        inputs: { name: 'name', routerOutletData: [1, 'routerOutletData'] },
        outputs: {
          activateEvents: 'activate',
          deactivateEvents: 'deactivate',
          attachEvents: 'attach',
          detachEvents: 'detach',
        },
        exportAs: ['outlet'],
        features: [Wa],
      });
    }
    return e;
  })(),
  il = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(t, n, r, o) {
      (this.route = t), (this.childContexts = n), (this.parent = r), (this.outletData = o);
    }
    get(t, n) {
      return t === qt
        ? this.route
        : t === qr
        ? this.childContexts
        : t === dI
        ? this.outletData
        : this.parent.get(t, n);
    }
  },
  qi = new y('');
var Xp = (() => {
  class e {
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵcmp = Ke({
      type: e,
      selectors: [['ng-component']],
      exportAs: ['emptyRouterOutlet'],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        r & 1 && He(0, 'router-outlet');
      },
      dependencies: [Jp],
      encapsulation: 2,
    });
  }
  return e;
})();
function pl(e) {
  let t = e.children && e.children.map(pl),
    n = t ? j(g({}, e), { children: t }) : g({}, e);
  return (
    !n.component &&
      !n.loadComponent &&
      (t || n.loadChildren) &&
      n.outlet &&
      n.outlet !== D &&
      (n.component = Xp),
    n
  );
}
function fI(e, t, n) {
  let r = Vr(e, t._root, n ? n._root : void 0);
  return new Hi(r, t);
}
function Vr(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = t.value;
    let o = pI(e, t, n);
    return new he(r, o);
  } else {
    if (e.shouldAttach(t.value)) {
      let i = e.retrieve(t.value);
      if (i !== null) {
        let s = i.route;
        return (
          (s.value._futureSnapshot = t.value), (s.children = t.children.map((a) => Vr(e, a))), s
        );
      }
    }
    let r = hI(t.value),
      o = t.children.map((i) => Vr(e, i));
    return new he(r, o);
  }
}
function pI(e, t, n) {
  return t.children.map((r) => {
    for (let o of n.children) if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Vr(e, r, o);
    return Vr(e, r);
  });
}
function hI(e) {
  return new qt(
    new Z(e.url),
    new Z(e.params),
    new Z(e.queryParams),
    new Z(e.fragment),
    new Z(e.data),
    e.outlet,
    e.component,
    e
  );
}
var Ur = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(t, n) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = n);
    }
  },
  eh = 'ngNavigationCancelingError';
function $i(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: r } = Rn(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    o = th(!1, ue.Redirect);
  return (o.url = n), (o.navigationBehaviorOptions = r), o;
}
function th(e, t) {
  let n = new Error(`NavigationCancelingError: ${e || ''}`);
  return (n[eh] = !0), (n.cancellationCode = t), n;
}
function gI(e) {
  return nh(e) && Rn(e.url);
}
function nh(e) {
  return !!e && e[eh];
}
var mI = (e, t, n, r) =>
    R((o) => (new sl(t, o.targetRouterState, o.currentRouterState, n, r).activate(e), o)),
  sl = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(t, n, r, o, i) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = o),
        (this.inputBindingEnabled = i);
    }
    activate(t) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, t),
        jc(this.futureState.root),
        this.activateChildRoutes(n, r, t);
    }
    deactivateChildRoutes(t, n, r) {
      let o = bn(n);
      t.children.forEach((i) => {
        let s = i.value.outlet;
        this.deactivateRoutes(i, o[s], r), delete o[s];
      }),
        Object.values(o).forEach((i) => {
          this.deactivateRouteAndItsChildren(i, r);
        });
    }
    deactivateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if (o === i)
        if (o.component) {
          let s = r.getContext(o.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, r);
      else i && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = bn(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      if (r && r.outlet) {
        let s = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, { componentRef: s, route: t, contexts: a });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let r = n.getContext(t.value.outlet),
        o = r && t.value.component ? r.children : n,
        i = bn(t);
      for (let s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, n, r) {
      let o = bn(n);
      t.children.forEach((i) => {
        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new el(i.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new Jc(t.value.snapshot));
    }
    activateRoutes(t, n, r) {
      let o = t.value,
        i = n ? n.value : null;
      if ((jc(o), o === i))
        if (o.component) {
          let s = r.getOrCreateContext(o.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, r);
      else if (o.component) {
        let s = r.getOrCreateContext(o.outlet);
        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(o.snapshot);
          this.routeReuseStrategy.store(o.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            jc(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = o),
            s.outlet && s.outlet.activateWith(o, s.injector),
            this.activateChildRoutes(t, null, s.children);
      } else this.activateChildRoutes(t, null, r);
    }
  },
  Bi = class {
    path;
    route;
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  _n = class {
    component;
    route;
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function vI(e, t, n) {
  let r = e._root,
    o = t ? t._root : null;
  return Or(r, o, n, [r.value]);
}
function yI(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function Pn(e, t) {
  let n = Symbol(),
    r = t.get(e, n);
  return r === n ? (typeof e == 'function' && !ks(e) ? e : t.get(e)) : r;
}
function Or(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = bn(t);
  return (
    e.children.forEach((s) => {
      EI(s, i[s.value.outlet], n, r.concat([s.value]), o), delete i[s.value.outlet];
    }),
    Object.entries(i).forEach(([s, a]) => Lr(a, n.getContext(s), o)),
    o
  );
}
function EI(e, t, n, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let i = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && i.routeConfig === s.routeConfig) {
    let c = II(s, i, i.routeConfig.runGuardsAndResolvers);
    c
      ? o.canActivateChecks.push(new Bi(r))
      : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
      i.component ? Or(e, t, a ? a.children : null, r, o) : Or(e, t, n, r, o),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        o.canDeactivateChecks.push(new _n(a.outlet.component, s));
  } else
    s && Lr(t, a, o),
      o.canActivateChecks.push(new Bi(r)),
      i.component ? Or(e, null, a ? a.children : null, r, o) : Or(e, null, n, r, o);
  return o;
}
function II(e, t, n) {
  if (typeof n == 'function') return n(e, t);
  switch (n) {
    case 'pathParamsChange':
      return !zt(e.url, t.url);
    case 'pathParamsOrQueryParamsChange':
      return !zt(e.url, t.url) || !Ve(e.queryParams, t.queryParams);
    case 'always':
      return !0;
    case 'paramsOrQueryParamsChange':
      return !ol(e, t) || !Ve(e.queryParams, t.queryParams);
    case 'paramsChange':
    default:
      return !ol(e, t);
  }
}
function Lr(e, t, n) {
  let r = bn(e),
    o = e.value;
  Object.entries(r).forEach(([i, s]) => {
    o.component ? (t ? Lr(s, t.children.getContext(i), n) : Lr(s, null, n)) : Lr(s, t, n);
  }),
    o.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new _n(t.outlet.component, o))
        : n.canDeactivateChecks.push(new _n(null, o))
      : n.canDeactivateChecks.push(new _n(null, o));
}
function Gr(e) {
  return typeof e == 'function';
}
function wI(e) {
  return typeof e == 'boolean';
}
function DI(e) {
  return e && Gr(e.canLoad);
}
function CI(e) {
  return e && Gr(e.canActivate);
}
function bI(e) {
  return e && Gr(e.canActivateChild);
}
function SI(e) {
  return e && Gr(e.canDeactivate);
}
function TI(e) {
  return e && Gr(e.canMatch);
}
function rh(e) {
  return e instanceof Ue || e?.name === 'EmptyError';
}
var Ri = Symbol('INITIAL_VALUE');
function On() {
  return se((e) =>
    yo(e.map((t) => t.pipe($e(1), ws(Ri)))).pipe(
      R((t) => {
        for (let n of t)
          if (n !== !0) {
            if (n === Ri) return Ri;
            if (n === !1 || _I(n)) return n;
          }
        return !0;
      }),
      ge((t) => t !== Ri),
      $e(1)
    )
  );
}
function _I(e) {
  return Rn(e) || e instanceof Ur;
}
function MI(e, t) {
  return U((n) => {
    let {
      targetSnapshot: r,
      currentSnapshot: o,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && i.length === 0
      ? I(j(g({}, n), { guardsResult: !0 }))
      : NI(s, r, o, e).pipe(
          U((a) => (a && wI(a) ? RI(r, i, e, t) : I(a))),
          R((a) => j(g({}, n), { guardsResult: a }))
        );
  });
}
function NI(e, t, n, r) {
  return V(e).pipe(
    U((o) => PI(o.component, o.route, n, t, r)),
    Be((o) => o !== !0, !0)
  );
}
function RI(e, t, n, r) {
  return V(t).pipe(
    on((o) => rn(AI(o.route.parent, r), xI(o.route, r), kI(e, o.path, n), OI(e, o.route, n))),
    Be((o) => o !== !0, !0)
  );
}
function xI(e, t) {
  return e !== null && t && t(new Xc(e)), I(!0);
}
function AI(e, t) {
  return e !== null && t && t(new Kc(e)), I(!0);
}
function OI(e, t, n) {
  let r = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!r || r.length === 0) return I(!0);
  let o = r.map((i) =>
    Bn(() => {
      let s = kn(t) ?? n,
        a = Pn(i, s),
        c = CI(a) ? a.canActivate(t, e) : ee(s, () => a(t, e));
      return tt(c).pipe(Be());
    })
  );
  return I(o).pipe(On());
}
function kI(e, t, n) {
  let r = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => yI(s))
      .filter((s) => s !== null)
      .map((s) =>
        Bn(() => {
          let a = s.guards.map((c) => {
            let l = kn(s.node) ?? n,
              u = Pn(c, l),
              d = bI(u) ? u.canActivateChild(r, e) : ee(l, () => u(r, e));
            return tt(d).pipe(Be());
          });
          return I(a).pipe(On());
        })
      );
  return I(i).pipe(On());
}
function PI(e, t, n, r, o) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return I(!0);
  let s = i.map((a) => {
    let c = kn(t) ?? o,
      l = Pn(a, c),
      u = SI(l) ? l.canDeactivate(e, t, n, r) : ee(c, () => l(e, t, n, r));
    return tt(u).pipe(Be());
  });
  return I(s).pipe(On());
}
function LI(e, t, n, r) {
  let o = t.canLoad;
  if (o === void 0 || o.length === 0) return I(!0);
  let i = o.map((s) => {
    let a = Pn(s, e),
      c = DI(a) ? a.canLoad(t, n) : ee(e, () => a(t, n));
    return tt(c);
  });
  return I(i).pipe(On(), oh(r));
}
function oh(e) {
  return hs(
    q((t) => {
      if (typeof t != 'boolean') throw $i(e, t);
    }),
    R((t) => t === !0)
  );
}
function FI(e, t, n, r) {
  let o = t.canMatch;
  if (!o || o.length === 0) return I(!0);
  let i = o.map((s) => {
    let a = Pn(s, e),
      c = TI(a) ? a.canMatch(t, n) : ee(e, () => a(t, n));
    return tt(c);
  });
  return I(i).pipe(On(), oh(r));
}
var $r = class {
    segmentGroup;
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  Br = class extends Error {
    urlTree;
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function Cn(e) {
  return nn(new $r(e));
}
function jI(e) {
  return nn(new v(4e3, !1));
}
function HI(e) {
  return nn(th(!1, ue.GuardRejected));
}
var al = class {
  urlSerializer;
  urlTree;
  constructor(t, n) {
    (this.urlSerializer = t), (this.urlTree = n);
  }
  lineralizeSegments(t, n) {
    let r = [],
      o = n.root;
    for (;;) {
      if (((r = r.concat(o.segments)), o.numberOfChildren === 0)) return I(r);
      if (o.numberOfChildren > 1 || !o.children[D]) return jI(`${t.redirectTo}`);
      o = o.children[D];
    }
  }
  applyRedirectCommands(t, n, r, o, i) {
    return VI(n, o, i).pipe(
      R((s) => {
        if (s instanceof et) throw new Br(s);
        let a = this.applyRedirectCreateUrlTree(s, this.urlSerializer.parse(s), t, r);
        if (s[0] === '/') throw new Br(a);
        return a;
      })
    );
  }
  applyRedirectCreateUrlTree(t, n, r, o) {
    let i = this.createSegmentGroup(t, n.root, r, o);
    return new et(i, this.createQueryParams(n.queryParams, this.urlTree.queryParams), n.fragment);
  }
  createQueryParams(t, n) {
    let r = {};
    return (
      Object.entries(t).forEach(([o, i]) => {
        if (typeof i == 'string' && i[0] === ':') {
          let a = i.substring(1);
          r[o] = n[a];
        } else r[o] = i;
      }),
      r
    );
  }
  createSegmentGroup(t, n, r, o) {
    let i = this.createSegments(t, n.segments, r, o),
      s = {};
    return (
      Object.entries(n.children).forEach(([a, c]) => {
        s[a] = this.createSegmentGroup(t, c, r, o);
      }),
      new k(i, s)
    );
  }
  createSegments(t, n, r, o) {
    return n.map((i) => (i.path[0] === ':' ? this.findPosParam(t, i, o) : this.findOrReturn(i, r)));
  }
  findPosParam(t, n, r) {
    let o = r[n.path.substring(1)];
    if (!o) throw new v(4001, !1);
    return o;
  }
  findOrReturn(t, n) {
    let r = 0;
    for (let o of n) {
      if (o.path === t.path) return n.splice(r), o;
      r++;
    }
    return t;
  }
};
function VI(e, t, n) {
  if (typeof e == 'string') return I(e);
  let r = e,
    {
      queryParams: o,
      fragment: i,
      routeConfig: s,
      url: a,
      outlet: c,
      params: l,
      data: u,
      title: d,
    } = t;
  return tt(
    ee(n, () =>
      r({
        params: l,
        data: u,
        queryParams: o,
        fragment: i,
        routeConfig: s,
        url: a,
        outlet: c,
        title: d,
      })
    )
  );
}
var cl = {
  matched: !1,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {},
};
function UI(e, t, n, r, o) {
  let i = ih(e, t, n);
  return i.matched
    ? ((r = cI(t, r)), FI(r, t, n, o).pipe(R((s) => (s === !0 ? i : g({}, cl)))))
    : I(i);
}
function ih(e, t, n) {
  if (t.path === '**') return $I(n);
  if (t.path === '')
    return t.pathMatch === 'full' && (e.hasChildren() || n.length > 0)
      ? g({}, cl)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let o = (t.matcher || PE)(n, e, t);
  if (!o) return g({}, cl);
  let i = {};
  Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
    i[a] = c.path;
  });
  let s = o.consumed.length > 0 ? g(g({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
  return {
    matched: !0,
    consumedSegments: o.consumed,
    remainingSegments: n.slice(o.consumed.length),
    parameters: s,
    positionalParamSegments: o.posParams ?? {},
  };
}
function $I(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? Lp(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Ap(e, t, n, r) {
  return n.length > 0 && qI(e, n, r)
    ? { segmentGroup: new k(t, zI(r, new k(n, e.children))), slicedSegments: [] }
    : n.length === 0 && GI(e, n, r)
    ? { segmentGroup: new k(e.segments, BI(e, n, r, e.children)), slicedSegments: n }
    : { segmentGroup: new k(e.segments, e.children), slicedSegments: n };
}
function BI(e, t, n, r) {
  let o = {};
  for (let i of n)
    if (Gi(e, t, i) && !r[Re(i)]) {
      let s = new k([], {});
      o[Re(i)] = s;
    }
  return g(g({}, r), o);
}
function zI(e, t) {
  let n = {};
  n[D] = t;
  for (let r of e)
    if (r.path === '' && Re(r) !== D) {
      let o = new k([], {});
      n[Re(r)] = o;
    }
  return n;
}
function qI(e, t, n) {
  return n.some((r) => Gi(e, t, r) && Re(r) !== D);
}
function GI(e, t, n) {
  return n.some((r) => Gi(e, t, r));
}
function Gi(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === 'full' ? !1 : n.path === '';
}
function WI(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var ll = class {};
function ZI(e, t, n, r, o, i, s = 'emptyOnly') {
  return new ul(e, t, n, r, o, s, i).recognize();
}
var QI = 31,
  ul = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = !0;
    constructor(t, n, r, o, i, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = o),
        (this.urlTree = i),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new al(this.urlSerializer, this.urlTree));
    }
    noMatchError(t) {
      return new v(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = Ap(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        R(({ children: n, rootSnapshot: r }) => {
          let o = new he(r, n),
            i = new Ui('', o),
            s = eI(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (i.url = this.urlSerializer.serialize(s)),
            { state: i, tree: s }
          );
        })
      );
    }
    match(t) {
      let n = new Tn(
        [],
        Object.freeze({}),
        Object.freeze(g({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        D,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, t, D, n).pipe(
        R((r) => ({ children: r, rootSnapshot: n })),
        rt((r) => {
          if (r instanceof Br) return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof $r ? this.noMatchError(r) : r;
        })
      );
    }
    processSegmentGroup(t, n, r, o, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(t, n, r, i)
        : this.processSegment(t, n, r, r.segments, o, !0, i).pipe(
            R((s) => (s instanceof he ? [s] : []))
          );
    }
    processChildren(t, n, r, o) {
      let i = [];
      for (let s of Object.keys(r.children)) s === 'primary' ? i.unshift(s) : i.push(s);
      return V(i).pipe(
        on((s) => {
          let a = r.children[s],
            c = lI(n, s);
          return this.processSegmentGroup(t, c, a, s, o);
        }),
        Is((s, a) => (s.push(...a), s)),
        ot(null),
        Es(),
        U((s) => {
          if (s === null) return Cn(r);
          let a = sh(s);
          return YI(a), I(a);
        })
      );
    }
    processSegment(t, n, r, o, i, s, a) {
      return V(n).pipe(
        on((c) =>
          this.processSegmentAgainstRoute(c._injector ?? t, n, c, r, o, i, s, a).pipe(
            rt((l) => {
              if (l instanceof $r) return I(null);
              throw l;
            })
          )
        ),
        Be((c) => !!c),
        rt((c) => {
          if (rh(c)) return WI(r, o, i) ? I(new ll()) : Cn(r);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(t, n, r, o, i, s, a, c) {
      return Re(r) !== s && (s === D || !Gi(o, i, r))
        ? Cn(o)
        : r.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, o, r, i, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, i, s, c)
        : Cn(o);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s, a) {
      let {
        matched: c,
        parameters: l,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: p,
      } = ih(n, o, i);
      if (!c) return Cn(n);
      typeof o.redirectTo == 'string' &&
        o.redirectTo[0] === '/' &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > QI && (this.allowRedirects = !1));
      let f = new Tn(
          i,
          l,
          Object.freeze(g({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          Op(o),
          Re(o),
          o.component ?? o._loadedComponent ?? null,
          o,
          kp(o)
        ),
        m = Vi(f, a, this.paramsInheritanceStrategy);
      return (
        (f.params = Object.freeze(m.params)),
        (f.data = Object.freeze(m.data)),
        this.applyRedirects.applyRedirectCommands(u, o.redirectTo, d, f, t).pipe(
          se((L) => this.applyRedirects.lineralizeSegments(o, L)),
          U((L) => this.processSegment(t, r, n, L.concat(p), s, !1, a))
        )
      );
    }
    matchSegmentAgainstRoute(t, n, r, o, i, s) {
      let a = UI(n, r, o, t, this.urlSerializer);
      return (
        r.path === '**' && (n.children = {}),
        a.pipe(
          se((c) =>
            c.matched
              ? ((t = r._injector ?? t),
                this.getChildConfig(t, r, o).pipe(
                  se(({ routes: l }) => {
                    let u = r._loadedInjector ?? t,
                      { parameters: d, consumedSegments: p, remainingSegments: f } = c,
                      m = new Tn(
                        p,
                        d,
                        Object.freeze(g({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        Op(r),
                        Re(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        kp(r)
                      ),
                      C = Vi(m, s, this.paramsInheritanceStrategy);
                    (m.params = Object.freeze(C.params)), (m.data = Object.freeze(C.data));
                    let { segmentGroup: L, slicedSegments: P } = Ap(n, p, f, l);
                    if (P.length === 0 && L.hasChildren())
                      return this.processChildren(u, l, L, m).pipe(R((Wr) => new he(m, Wr)));
                    if (l.length === 0 && P.length === 0) return I(new he(m, []));
                    let Eh = Re(r) === i;
                    return this.processSegment(u, l, L, P, Eh ? D : i, !0, m).pipe(
                      R((Wr) => new he(m, Wr instanceof he ? [Wr] : []))
                    );
                  })
                ))
              : Cn(n)
          )
        )
      );
    }
    getChildConfig(t, n, r) {
      return n.children
        ? I({ routes: n.children, injector: t })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? I({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : LI(t, n, r, this.urlSerializer).pipe(
              U((o) =>
                o
                  ? this.configLoader.loadChildren(t, n).pipe(
                      q((i) => {
                        (n._loadedRoutes = i.routes), (n._loadedInjector = i.injector);
                      })
                    )
                  : HI(n)
              )
            )
        : I({ routes: [], injector: t });
    }
  };
function YI(e) {
  e.sort((t, n) =>
    t.value.outlet === D
      ? -1
      : n.value.outlet === D
      ? 1
      : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function KI(e) {
  let t = e.value.routeConfig;
  return t && t.path === '';
}
function sh(e) {
  let t = [],
    n = new Set();
  for (let r of e) {
    if (!KI(r)) {
      t.push(r);
      continue;
    }
    let o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
    o !== void 0 ? (o.children.push(...r.children), n.add(o)) : t.push(r);
  }
  for (let r of n) {
    let o = sh(r.children);
    t.push(new he(r.value, o));
  }
  return t.filter((r) => !n.has(r));
}
function Op(e) {
  return e.data || {};
}
function kp(e) {
  return e.resolve || {};
}
function JI(e, t, n, r, o, i) {
  return U((s) =>
    ZI(e, t, n, r, s.extractedUrl, o, i).pipe(
      R(({ state: a, tree: c }) => j(g({}, s), { targetSnapshot: a, urlAfterRedirects: c }))
    )
  );
}
function XI(e, t) {
  return U((n) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: o },
    } = n;
    if (!o.length) return I(n);
    let i = new Set(o.map((c) => c.route)),
      s = new Set();
    for (let c of i) if (!s.has(c)) for (let l of ah(c)) s.add(l);
    let a = 0;
    return V(s).pipe(
      on((c) => (i.has(c) ? ew(c, r, e, t) : ((c.data = Vi(c, c.parent, e).resolve), I(void 0)))),
      q(() => a++),
      sn(1),
      U((c) => (a === s.size ? I(n) : oe))
    );
  });
}
function ah(e) {
  let t = e.children.map((n) => ah(n)).flat();
  return [e, ...t];
}
function ew(e, t, n, r) {
  let o = e.routeConfig,
    i = e._resolve;
  return (
    o?.title !== void 0 && !Kp(o) && (i[zr] = o.title),
    Bn(
      () => (
        (e.data = Vi(e, e.parent, n).resolve),
        tw(i, e, t, r).pipe(R((s) => ((e._resolvedData = s), (e.data = g(g({}, e.data), s)), null)))
      )
    )
  );
}
function tw(e, t, n, r) {
  let o = Uc(e);
  if (o.length === 0) return I({});
  let i = {};
  return V(o).pipe(
    U((s) =>
      nw(e[s], t, n, r).pipe(
        Be(),
        q((a) => {
          if (a instanceof Ur) throw $i(new Nn(), a);
          i[s] = a;
        })
      )
    ),
    sn(1),
    R(() => i),
    rt((s) => (rh(s) ? oe : nn(s)))
  );
}
function nw(e, t, n, r) {
  let o = kn(t) ?? r,
    i = Pn(e, o),
    s = i.resolve ? i.resolve(t, n) : ee(o, () => i(t, n));
  return tt(s);
}
function Hc(e) {
  return se((t) => {
    let n = e(t);
    return n ? V(n).pipe(R(() => t)) : I(t);
  });
}
var ch = (() => {
    class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r), (o = o.children.find((i) => i.outlet === D));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[zr];
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(rw), providedIn: 'root' });
    }
    return e;
  })(),
  rw = (() => {
    class e extends ch {
      title;
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || e)(b(_p));
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  Wi = new y('', { providedIn: 'root', factory: () => ({}) }),
  Zi = new y(''),
  lh = (() => {
    class e {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = h(vc);
      loadComponent(n, r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return I(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let o = tt(ee(n, () => r.loadComponent())).pipe(
            R(uh),
            se(dh),
            q((s) => {
              this.onLoadEndListener && this.onLoadEndListener(r), (r._loadedComponent = s);
            }),
            zn(() => {
              this.componentLoaders.delete(r);
            })
          ),
          i = new tn(o, () => new W()).pipe(en());
        return this.componentLoaders.set(r, i), i;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes) return I({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = ow(r, this.compiler, n, this.onLoadEndListener).pipe(
            zn(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          s = new tn(i, () => new W()).pipe(en());
        return this.childrenLoaders.set(r, s), s;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function ow(e, t, n, r) {
  return tt(ee(n, () => e.loadChildren())).pipe(
    R(uh),
    se(dh),
    U((o) => (o instanceof yi || Array.isArray(o) ? I(o) : V(t.compileModuleAsync(o)))),
    R((o) => {
      r && r(e);
      let i,
        s,
        a = !1;
      return (
        Array.isArray(o)
          ? ((s = o), (a = !0))
          : ((i = o.create(n).injector), (s = i.get(Zi, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(pl), injector: i }
      );
    })
  );
}
function iw(e) {
  return e && typeof e == 'object' && 'default' in e;
}
function uh(e) {
  return iw(e) ? e.default : e;
}
function dh(e) {
  return I(e);
}
var hl = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(sw), providedIn: 'root' });
    }
    return e;
  })(),
  sw = (() => {
    class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  fh = new y('');
var ph = new y(''),
  hh = (() => {
    class e {
      currentNavigation = Ft(null, { equal: () => !1 });
      currentTransition = null;
      lastSuccessfulNavigation = null;
      events = new W();
      transitionAbortWithErrorSubject = new W();
      configLoader = h(lh);
      environmentInjector = h(Q);
      destroyRef = h(Lt);
      urlSerializer = h(zi);
      rootContexts = h(qr);
      location = h(Dn);
      inputBindingEnabled = h(qi, { optional: !0 }) !== null;
      titleStrategy = h(ch);
      options = h(Wi, { optional: !0 }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly';
      urlHandlingStrategy = h(hl);
      createViewTransition = h(fh, { optional: !0 });
      navigationErrorHandler = h(ph, { optional: !0 });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => I(void 0);
      rootComponentType = null;
      destroyed = !1;
      constructor() {
        let n = (o) => this.events.next(new Qc(o)),
          r = (o) => this.events.next(new Yc(o));
        (this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = n),
          this.destroyRef.onDestroy(() => {
            this.destroyed = !0;
          });
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let r = ++this.navigationId;
        ht(() => {
          this.transitions?.next(
            j(g({}, n), {
              extractedUrl: this.urlHandlingStrategy.extract(n.rawUrl),
              targetSnapshot: null,
              targetRouterState: null,
              guards: { canActivateChecks: [], canDeactivateChecks: [] },
              guardsResult: null,
              abortController: new AbortController(),
              id: r,
            })
          );
        });
      }
      setupNavigations(n) {
        return (
          (this.transitions = new Z(null)),
          this.transitions.pipe(
            ge((r) => r !== null),
            se((r) => {
              let o = !1;
              return I(r).pipe(
                se((i) => {
                  if (this.navigationId > r.id)
                    return this.cancelNavigationTransition(r, '', ue.SupersededByNewNavigation), oe;
                  (this.currentTransition = r),
                    this.currentNavigation.set({
                      id: i.id,
                      initialUrl: i.rawUrl,
                      extractedUrl: i.extractedUrl,
                      targetBrowserUrl:
                        typeof i.extras.browserUrl == 'string'
                          ? this.urlSerializer.parse(i.extras.browserUrl)
                          : i.extras.browserUrl,
                      trigger: i.source,
                      extras: i.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? j(g({}, this.lastSuccessfulNavigation), { previousNavigation: null })
                        : null,
                      abort: () => i.abortController.abort(),
                    });
                  let s =
                      !n.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                    a = i.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!s && a !== 'reload')
                    return (
                      this.events.next(
                        new yt(
                          i.id,
                          this.urlSerializer.serialize(i.rawUrl),
                          '',
                          Li.IgnoredSameUrlNavigation
                        )
                      ),
                      i.resolve(!1),
                      oe
                    );
                  if (this.urlHandlingStrategy.shouldProcessUrl(i.rawUrl))
                    return I(i).pipe(
                      se(
                        (c) => (
                          this.events.next(
                            new xn(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              c.source,
                              c.restoredState
                            )
                          ),
                          c.id !== this.navigationId ? oe : Promise.resolve(c)
                        )
                      ),
                      JI(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      q((c) => {
                        (r.targetSnapshot = c.targetSnapshot),
                          (r.urlAfterRedirects = c.urlAfterRedirects),
                          this.currentNavigation.update(
                            (u) => ((u.finalUrl = c.urlAfterRedirects), u)
                          );
                        let l = new Fi(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(l);
                      })
                    );
                  if (s && this.urlHandlingStrategy.shouldProcessUrl(i.currentRawUrl)) {
                    let { id: c, extractedUrl: l, source: u, restoredState: d, extras: p } = i,
                      f = new xn(c, this.urlSerializer.serialize(l), u, d);
                    this.events.next(f);
                    let m = Qp(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = r =
                        j(g({}, i), {
                          targetSnapshot: m,
                          urlAfterRedirects: l,
                          extras: j(g({}, p), { skipLocationChange: !1, replaceUrl: !1 }),
                        })),
                      this.currentNavigation.update((C) => ((C.finalUrl = l), C)),
                      I(r)
                    );
                  } else
                    return (
                      this.events.next(
                        new yt(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          '',
                          Li.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      i.resolve(!1),
                      oe
                    );
                }),
                q((i) => {
                  let s = new qc(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot
                  );
                  this.events.next(s);
                }),
                R(
                  (i) => (
                    (this.currentTransition = r =
                      j(g({}, i), {
                        guards: vI(i.targetSnapshot, i.currentSnapshot, this.rootContexts),
                      })),
                    r
                  )
                ),
                MI(this.environmentInjector, (i) => this.events.next(i)),
                q((i) => {
                  if (
                    ((r.guardsResult = i.guardsResult),
                    i.guardsResult && typeof i.guardsResult != 'boolean')
                  )
                    throw $i(this.urlSerializer, i.guardsResult);
                  let s = new Gc(
                    i.id,
                    this.urlSerializer.serialize(i.extractedUrl),
                    this.urlSerializer.serialize(i.urlAfterRedirects),
                    i.targetSnapshot,
                    !!i.guardsResult
                  );
                  this.events.next(s);
                }),
                ge((i) =>
                  i.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(i, '', ue.GuardRejected), !1)
                ),
                Hc((i) => {
                  if (i.guards.canActivateChecks.length !== 0)
                    return I(i).pipe(
                      q((s) => {
                        let a = new Wc(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      }),
                      se((s) => {
                        let a = !1;
                        return I(s).pipe(
                          XI(this.paramsInheritanceStrategy, this.environmentInjector),
                          q({
                            next: () => (a = !0),
                            complete: () => {
                              a || this.cancelNavigationTransition(s, '', ue.NoDataFromResolver);
                            },
                          })
                        );
                      }),
                      q((s) => {
                        let a = new Zc(
                          s.id,
                          this.urlSerializer.serialize(s.extractedUrl),
                          this.urlSerializer.serialize(s.urlAfterRedirects),
                          s.targetSnapshot
                        );
                        this.events.next(a);
                      })
                    );
                }),
                Hc((i) => {
                  let s = (a) => {
                    let c = [];
                    if (a.routeConfig?.loadComponent) {
                      let l = kn(a) ?? this.environmentInjector;
                      c.push(
                        this.configLoader.loadComponent(l, a.routeConfig).pipe(
                          q((u) => {
                            a.component = u;
                          }),
                          R(() => {})
                        )
                      );
                    }
                    for (let l of a.children) c.push(...s(l));
                    return c;
                  };
                  return yo(s(i.targetSnapshot.root)).pipe(ot(null), $e(1));
                }),
                Hc(() => this.afterPreactivation()),
                se(() => {
                  let { currentSnapshot: i, targetSnapshot: s } = r,
                    a = this.createViewTransition?.(this.environmentInjector, i.root, s.root);
                  return a ? V(a).pipe(R(() => r)) : I(r);
                }),
                R((i) => {
                  let s = fI(n.routeReuseStrategy, i.targetSnapshot, i.currentRouterState);
                  return (
                    (this.currentTransition = r = j(g({}, i), { targetRouterState: s })),
                    this.currentNavigation.update((a) => ((a.targetRouterState = s), a)),
                    r
                  );
                }),
                q(() => {
                  this.events.next(new Hr());
                }),
                mI(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (i) => this.events.next(i),
                  this.inputBindingEnabled
                ),
                $e(1),
                Io(
                  new x((i) => {
                    let s = r.abortController.signal,
                      a = () => i.next();
                    return s.addEventListener('abort', a), () => s.removeEventListener('abort', a);
                  }).pipe(
                    ge(() => !o && !r.targetRouterState),
                    q(() => {
                      this.cancelNavigationTransition(
                        r,
                        r.abortController.signal.reason + '',
                        ue.Aborted
                      );
                    })
                  )
                ),
                q({
                  next: (i) => {
                    (o = !0),
                      (this.lastSuccessfulNavigation = ht(this.currentNavigation)),
                      this.events.next(
                        new vt(
                          i.id,
                          this.urlSerializer.serialize(i.extractedUrl),
                          this.urlSerializer.serialize(i.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(i.targetRouterState.snapshot),
                      i.resolve(!0);
                  },
                  complete: () => {
                    o = !0;
                  },
                }),
                Io(
                  this.transitionAbortWithErrorSubject.pipe(
                    q((i) => {
                      throw i;
                    })
                  )
                ),
                zn(() => {
                  o || this.cancelNavigationTransition(r, '', ue.SupersededByNewNavigation),
                    this.currentTransition?.id === r.id &&
                      (this.currentNavigation.set(null), (this.currentTransition = null));
                }),
                rt((i) => {
                  if (this.destroyed) return r.resolve(!1), oe;
                  if (((o = !0), nh(i)))
                    this.events.next(
                      new Xe(
                        r.id,
                        this.urlSerializer.serialize(r.extractedUrl),
                        i.message,
                        i.cancellationCode
                      )
                    ),
                      gI(i)
                        ? this.events.next(new An(i.url, i.navigationBehaviorOptions))
                        : r.resolve(!1);
                  else {
                    let s = new jr(
                      r.id,
                      this.urlSerializer.serialize(r.extractedUrl),
                      i,
                      r.targetSnapshot ?? void 0
                    );
                    try {
                      let a = ee(this.environmentInjector, () => this.navigationErrorHandler?.(s));
                      if (a instanceof Ur) {
                        let { message: c, cancellationCode: l } = $i(this.urlSerializer, a);
                        this.events.next(
                          new Xe(r.id, this.urlSerializer.serialize(r.extractedUrl), c, l)
                        ),
                          this.events.next(new An(a.redirectTo, a.navigationBehaviorOptions));
                      } else throw (this.events.next(s), i);
                    } catch (a) {
                      this.options.resolveNavigationPromiseOnError ? r.resolve(!1) : r.reject(a);
                    }
                  }
                  return oe;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, r, o) {
        let i = new Xe(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
        this.events.next(i), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),
          r = ht(this.currentNavigation),
          o = r?.targetBrowserUrl ?? r?.extractedUrl;
        return n.toString() !== o?.toString() && !r?.extras.skipLocationChange;
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function aw(e) {
  return e !== Pr;
}
var cw = (() => {
    class e {
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(lw), providedIn: 'root' });
    }
    return e;
  })(),
  dl = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  lw = (() => {
    class e extends dl {
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = ci(e)))(o || e);
        };
      })();
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })(),
  gh = (() => {
    class e {
      urlSerializer = h(zi);
      options = h(Wi, { optional: !0 }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
      location = h(Dn);
      urlHandlingStrategy = h(hl);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      currentUrlTree = new et();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({ finalUrl: n, initialUrl: r, targetBrowserUrl: o }) {
        let i = n !== void 0 ? this.urlHandlingStrategy.merge(n, r) : r,
          s = o ?? i;
        return s instanceof et ? this.urlSerializer.serialize(s) : s;
      }
      commitTransition({ targetRouterState: n, finalUrl: r, initialUrl: o }) {
        r && n
          ? ((this.currentUrlTree = r),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(r, o)),
            (this.routerState = n))
          : (this.rawUrlTree = o);
      }
      routerState = Qp(null);
      getRouterState() {
        return this.routerState;
      }
      stateMemento = this.createStateMemento();
      updateStateMemento() {
        this.stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      resetInternalState({ finalUrl: n }) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n ?? this.rawUrlTree
          ));
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: () => h(uw), providedIn: 'root' });
    }
    return e;
  })(),
  uw = (() => {
    class e extends gh {
      currentPageId = 0;
      lastSuccessfulId = -1;
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== 'computed'
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === 'popstate' &&
            setTimeout(() => {
              n(r.url, r.state, 'popstate');
            });
        });
      }
      handleRouterEvent(n, r) {
        n instanceof xn
          ? this.updateStateMemento()
          : n instanceof yt
          ? this.commitTransition(r)
          : n instanceof Fi
          ? this.urlUpdateStrategy === 'eager' &&
            (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r))
          : n instanceof Hr
          ? (this.commitTransition(r),
            this.urlUpdateStrategy === 'deferred' &&
              !r.extras.skipLocationChange &&
              this.setBrowserUrl(this.createBrowserPath(r), r))
          : n instanceof Xe && n.code !== ue.SupersededByNewNavigation && n.code !== ue.Redirect
          ? this.restoreHistory(r)
          : n instanceof jr
          ? this.restoreHistory(r, !0)
          : n instanceof vt &&
            ((this.lastSuccessfulId = n.id), (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, { extras: r, id: o }) {
        let { replaceUrl: i, state: s } = r;
        if (this.location.isCurrentPathEqualTo(n) || i) {
          let a = this.browserPageId,
            c = g(g({}, s), this.generateNgRouterState(o, a));
          this.location.replaceState(n, '', c);
        } else {
          let a = g(g({}, s), this.generateNgRouterState(o, this.browserPageId + 1));
          this.location.go(n, '', a);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === 'computed') {
          let o = this.browserPageId,
            i = this.currentPageId - o;
          i !== 0
            ? this.location.historyGo(i)
            : this.getCurrentUrlTree() === n.finalUrl &&
              i === 0 &&
              (this.resetInternalState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' &&
            (r && this.resetInternalState(n), this.resetUrlToCurrentUrlTree());
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.getRawUrlTree()),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === 'computed'
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
      static ɵfac = (() => {
        let n;
        return function (o) {
          return (n || (n = ci(e)))(o || e);
        };
      })();
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function mh(e, t) {
  e.events
    .pipe(
      ge((n) => n instanceof vt || n instanceof Xe || n instanceof jr || n instanceof yt),
      R((n) =>
        n instanceof vt || n instanceof yt
          ? 0
          : (
              n instanceof Xe
                ? n.code === ue.Redirect || n.code === ue.SupersededByNewNavigation
                : !1
            )
          ? 2
          : 1
      ),
      ge((n) => n !== 2),
      $e(1)
    )
    .subscribe(() => {
      t();
    });
}
var dw = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
  fw = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' },
  gl = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      disposed = !1;
      nonRouterCurrentEntryChangeSubscription;
      console = h(pc);
      stateManager = h(gh);
      options = h(Wi, { optional: !0 }) || {};
      pendingTasks = h(We);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      navigationTransitions = h(hh);
      urlSerializer = h(zi);
      location = h(Dn);
      urlHandlingStrategy = h(hl);
      injector = h(Q);
      _events = new W();
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      navigated = !1;
      routeReuseStrategy = h(cw);
      onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
      config = h(Zi, { optional: !0 })?.flat() ?? [];
      componentInputBindingEnabled = !!h(qi, { optional: !0 });
      currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
      constructor() {
        this.resetConfig(this.config),
          this.navigationTransitions.setupNavigations(this).subscribe({
            error: (n) => {
              this.console.warn(n);
            },
          }),
          this.subscribeToNavigationEvents();
      }
      eventsSubscription = new H();
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              i = ht(this.navigationTransitions.currentNavigation);
            if (o !== null && i !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, i),
                r instanceof Xe &&
                  r.code !== ue.Redirect &&
                  r.code !== ue.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (r instanceof vt) this.navigated = !0;
              else if (r instanceof An) {
                let s = r.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = g(
                    {
                      browserUrl: o.extras.browserUrl,
                      info: o.extras.info,
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        o.extras.replaceUrl || this.urlUpdateStrategy === 'eager' || aw(o.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, Pr, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            aI(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortWithErrorSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n), (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Pr,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener((n, r, o) => {
            this.navigateToSyncWithBrowser(n, o, r);
          });
      }
      navigateToSyncWithBrowser(n, r, o) {
        let i = { replaceUrl: !0 },
          s = o?.navigationId ? o : null;
        if (o) {
          let c = g({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (i.state = c);
        }
        let a = this.parseUrl(n);
        this.scheduleNavigation(a, r, s, i).catch((c) => {
          this.disposed || this.injector.get(we)(c);
        });
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return ht(this.navigationTransitions.currentNavigation);
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(pl)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this._events.unsubscribe(),
          this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: i,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = r,
          l = c ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case 'merge':
            u = g(g({}, this.currentUrlTree.queryParams), i);
            break;
          case 'preserve':
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = i || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let p = o ? o.snapshot : this.routerState.snapshot.root;
          d = qp(p);
        } catch {
          (typeof n[0] != 'string' || n[0][0] !== '/') && (n = []), (d = this.currentUrlTree.root);
        }
        return Gp(d, n, u, l ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = Rn(n) ? n : this.parseUrl(n),
          i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(i, Pr, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return pw(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.console.warn(Zn(4018, !1)), this.urlSerializer.parse('/');
        }
      }
      isActive(n, r) {
        let o;
        if ((r === !0 ? (o = g({}, dw)) : r === !1 ? (o = g({}, fw)) : (o = r), Rn(n)))
          return Mp(this.currentUrlTree, n, o);
        let i = this.parseUrl(n);
        return Mp(this.currentUrlTree, i, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce((r, [o, i]) => (i != null && (r[o] = i), r), {});
      }
      scheduleNavigation(n, r, o, i, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, l;
        s
          ? ((a = s.resolve), (c = s.reject), (l = s.promise))
          : (l = new Promise((d, p) => {
              (a = d), (c = p);
            }));
        let u = this.pendingTasks.add();
        return (
          mh(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: i,
            resolve: a,
            reject: c,
            promise: l,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          l.catch((d) => Promise.reject(d))
        );
      }
      static ɵfac = function (r) {
        return new (r || e)();
      };
      static ɵprov = E({ token: e, factory: e.ɵfac, providedIn: 'root' });
    }
    return e;
  })();
function pw(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new v(4008, !1);
}
var hw = new y('');
function ml(e, ...t) {
  return Nt([
    { provide: Zi, multi: !0, useValue: e },
    [],
    { provide: qt, useFactory: gw, deps: [gl] },
    { provide: Ei, multi: !0, useFactory: mw },
    t.map((n) => n.ɵproviders),
  ]);
}
function gw(e) {
  return e.routerState.root;
}
function mw() {
  let e = h(Oe);
  return (t) => {
    let n = e.get($t);
    if (t !== n.components[0]) return;
    let r = e.get(gl),
      o = e.get(vw);
    e.get(yw) === 1 && r.initialNavigation(),
      e.get(Ew, null, { optional: !0 })?.setUpPreloading(),
      e.get(hw, null, { optional: !0 })?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      o.closed || (o.next(), o.complete(), o.unsubscribe());
  };
}
var vw = new y('', { factory: () => new W() }),
  yw = new y('', { providedIn: 'root', factory: () => 1 });
var Ew = new y('');
var vh = [];
var yh = { providers: [va(), Ec({ eventCoalescing: !0 }), ml(vh)] };
var Qi = class e {
  productName = 'Wireless Headphones';
  productImageSrc = 'images/headphone.avif';
  productPrice = '$49';
  isLiked = !1;
  markAsLiked() {
    this.isLiked = !0;
  }
  styleButton = {
    color: this.isLiked ? 'orange' : 'white',
    backgroundColor: this.isLiked ? 'green' : 'black',
  };
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = Ke({
    type: e,
    selectors: [['app-product-card']],
    decls: 10,
    vars: 5,
    consts: [
      [1, 'card'],
      ['alt', 'Not found', 3, 'src'],
      [3, 'click'],
    ],
    template: function (n, r) {
      n & 1 &&
        (ft(0, 'p'),
        Ne(1, 'product-card works!'),
        pt(),
        ft(2, 'div', 0)(3, 'h4'),
        Ne(4),
        pt(),
        ft(5, 'p'),
        Ne(6),
        pt(),
        Ii(7, 'img', 1),
        ft(8, 'button', 2),
        Di('click', function () {
          return r.markAsLiked();
        }),
        Ne(9, 'Like \u2764\uFE0F'),
        pt()()),
        n & 2 &&
          (wn(4),
          br('Name: ', r.productName),
          wn(2),
          br('Price: ', r.productPrice),
          wn(),
          wi('src', r.productImageSrc, tc),
          wn(),
          mc(r.styleButton));
    },
    encapsulation: 2,
  });
};
var Yi = class e {
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = Ke({
    type: e,
    selectors: [['app-product-list']],
    decls: 14,
    vars: 0,
    template: function (n, r) {
      n & 1 &&
        (dt(0, 'h1'),
        Ne(1, '\u{1F31F} Featured Products \u{1F31F}'),
        Me(),
        dt(2, 'div')(3, 'h3'),
        Ne(4, 'Card 1'),
        Me(),
        He(5, 'app-product-card'),
        Me(),
        dt(6, 'div')(7, 'h3'),
        Ne(8, 'Card 2'),
        Me(),
        He(9, 'app-product-card'),
        Me(),
        dt(10, 'div')(11, 'h3'),
        Ne(12, 'Card 3'),
        Me(),
        He(13, 'app-product-card'),
        Me());
    },
    dependencies: [Qi],
    encapsulation: 2,
  });
};
var Ki = class e {
  title = Ft('app');
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵcmp = Ke({
    type: e,
    selectors: [['app-root']],
    decls: 1,
    vars: 0,
    template: function (n, r) {
      n & 1 && He(0, 'app-product-list');
    },
    dependencies: [Yi],
    encapsulation: 2,
  });
};
Pc(Ki, yh).catch((e) => console.error(e));
