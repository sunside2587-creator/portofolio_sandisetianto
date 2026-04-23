<template>
  <div id="app" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        
        <div class="text-center mb-4">
          <h3 class="fw-light">Crypto <span class="fw-bold text-blue-light">Tracker</span></h3>
          <p class="text-muted small">Update Real-time via CoinGecko</p>
        </div>

        <div class="card bg-dark border-secondary mb-3 shadow-sm">
          <div class="card-body p-3">
            <div class="row g-2">
              <div class="col-7">
                <select v-model="selectedCoin" @change="fetchData" class="form-select form-select-sm bg-dark text-white border-secondary">
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="dogecoin">Dogecoin (DOGE)</option>
                  <option value="tether">Tether (USDT)</option>
                </select>
              </div>
              <div class="col-5">
                <select v-model="currency" @change="fetchData" class="form-select form-select-sm bg-dark text-white border-secondary">
                  <option value="usd">USD ($)</option>
                  <option value="idr">IDR (Rp)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="card crypto-card shadow-lg">
          <div class="card-body p-4 text-center">
            
            <div v-if="loading" class="py-5">
              <div class="spinner-border text-info" role="status"></div>
              <p class="mt-2 text-muted">Memuat data pasar...</p>
            </div>

            <div v-else-if="crypto.name">
              <img :src="crypto.image" class="img-crypto mb-3" alt="icon" style="width: 60px;">
              <h2 class="mb-0 text-uppercase fw-bold text-white">{{ crypto.symbol }}</h2>
              <p class="text-info small opacity-75">{{ crypto.name }}</p>
              
              <h1 class="display-5 price-text text-white">
                {{ currency === 'idr' ? 'Rp' : '$' }}{{ crypto.current_price?.toLocaleString() }}
              </h1>
              
              <div :class="crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'" class="fw-bold fs-5">
                <i :class="crypto.price_change_percentage_24h >= 0 ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'"></i>
                {{ crypto.price_change_percentage_24h?.toFixed(2) }}%
              </div>

              <hr class="my-4 border-secondary opacity-25">

              <div class="row text-muted small">
                <div class="col-6 text-start text-success">
                  High 24h: <br>
                  <span class="text-white">{{ currency === 'idr' ? 'Rp' : '$' }}{{ crypto.high_24h?.toLocaleString() }}</span>
                </div>
                <div class="col-6 text-end text-danger">
                  Low 24h: <br>
                  <span class="text-white">{{ currency === 'idr' ? 'Rp' : '$' }}{{ crypto.low_24h?.toLocaleString() }}</span>
                </div>
              </div>

              <button @click="fetchData" class="btn btn-primary w-100 mt-4 fw-bold shadow-sm py-2">
                <i class="bi bi-arrow-clockwise"></i> Refresh Harga
              </button>
            </div>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger mt-3 small border-0 bg-danger bg-opacity-25 text-white text-center">
          <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ errorMessage }}
        </div>
      
        <a href="#/Projects" class="btn btn-outline-primary w-100 mt-3 fw-bold rounded-pill shadow-sm py-2">
          <i class="bi bi-arrow-left-circle me-2"></i> Kembali ke Daftar Projects
        </a>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const crypto = ref({});
const loading = ref(true);
const error = ref(false);
const errorMessage = ref('');

// State untuk filter
const selectedCoin = ref('bitcoin');
const currency = ref('usd');

const fetchData = async () => {
  loading.value = true;
  error.value = false;
  
  // Menggabungkan pilihan user ke dalam URL API
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&ids=${selectedCoin.value}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      crypto.value = response.data[0];
    } else {
      throw new Error('Data tidak ditemukan');
    }
  } catch (err) {
    error.value = true;
    errorMessage.value = "Limit API tercapai atau koneksi bermasalah. Tunggu sebentar.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

