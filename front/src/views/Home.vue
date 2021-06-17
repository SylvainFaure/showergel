<template>
  <div class="text-2xl">
    <p id="servertime">{{ formattedServerTime }}</p>
    <p class="mt-6">Now playing</p>
    <h1 class="mt-8 t-title" id="currentTrack">
      {{ currentTrack }}
    </h1>
    <h2 class="mt-4 t-subtitle">
      Since {{ currentOnAirTime }} from {{ currentSource }}[{{ currentStatus }}]
    </h2>
  </div>
</template>

<script>
import http from "@/http";

export default {
  data() {
    return {
      serverTime: new Date(),
      currentArtist: "",
      currentTitle: "",
      currentSource: "",
      currentStatus: "connecting to Liquidsoap",
      currentOnAir: new Date(),
    };
  },

  computed: {
    formattedServerTime() {
      return this.serverTime.toLocaleTimeString();
    },
    currentTrack() {
      return `${this.currentArtist} - ${this.currentTitle}`;
    },
    currentOnAirTime() {
      return this.currentOnAir.toLocaleTimeString();
    },
  },

  methods: {
    getLive() {
      http
        .get("/live")
        .then(this.onLiveResponse)
        .catch((error) => {
          console.log(error);
        });
    },
    onLiveResponse({
      data: { artist, title, source, status, server_time, on_air },
    }) {
      setTimeout(this.getLive, 1000);
      this.currentArtist = artist || "";
      this.currentTitle = title || "";
      this.currentSource = source || "";
      this.currentStatus = status || "";
      this.serverTime = new Date(server_time);
      this.currentOnAir = new Date(on_air);
    },
  },
  mounted() {
    this.getLive();
  },
};
</script>