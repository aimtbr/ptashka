class Tracking extends EventTarget {
  url = '';

  constructor(data) {
    super();
  }

  pause() {
    this.dispatchEvent(this.event);
  }
}

const setTrackingStatus = (status) => {
  return () => {
    this.status = status;
  };
};
const setTrackingStatusRunning = setTrackingStatus(STATUS_RUNNING);
const setTrackingStatusPaused = setTrackingStatus(STATUS_PAUSED);

const tracking = new Tracking({
  url: 'https://webhook.site/81d016ce-da41-454f-843e-1096abc2fc0b',
  ptashkaSent: 0,
  status: '',
  interval: null,
  startedAt: 0,
});

// const event = new CustomEvent('update', { detail: tracking });

tracking.addEventListener('change', (event) =>
  console.log(event.detail.status)
);

tracking.setStatusRunning();
tracking.setStatusPaused();
