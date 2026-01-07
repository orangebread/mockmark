<script setup lang="ts">
import { MockMark, MockMarkProvider } from '@mockmark/vue'

const mockAdvisors = [
    { id: 1, name: 'Sarah Chen', specialty: 'Tarot', rating: 4.9 },
    { id: 2, name: 'Marcus Webb', specialty: 'Astrology', rating: 4.7 },
    { id: 3, name: 'Luna Star', specialty: 'Psychic', rating: 4.8 },
]

const mockStats = {
    totalUsers: 12450,
    activeNow: 342,
    revenue: '$45,230',
}
</script>

<template>
    <MockMarkProvider :enabled="true" default-variant="border" tooltip-trigger="hover">
        <div class="app">
            <header class="header">
                <h1>MockMark Vue Demo</h1>
                <p>Development-only visual indicators for mock data</p>
            </header>

            <main class="main">
                <!-- Border Variant -->
                <section class="section">
                    <h2>Border Variant <span class="variant-tag">default</span></h2>
                    <p class="description">Wraps content with a dashed border and floating label.</p>

                    <MockMark label="Advisors" reason="Hardcoded mock data - not connected to API">
                        <div class="card-grid">
                            <div v-for="advisor in mockAdvisors" :key="advisor.id" class="card">
                                <h3>{{ advisor.name }}</h3>
                                <p>{{ advisor.specialty }}</p>
                                <div class="rating">★ {{ advisor.rating }}</div>
                            </div>
                        </div>
                    </MockMark>
                </section>

                <!-- Badge Variant -->
                <section class="section">
                    <h2>Badge Variant</h2>
                    <p class="description">Just the label badge, positioned absolutely.</p>

                    <MockMark variant="badge" label="Stats" reason="Static placeholder values">
                        <div class="stats-panel">
                            <div class="stat">
                                <span class="stat-value">{{ mockStats.totalUsers.toLocaleString() }}</span>
                                <span class="stat-label">Total Users</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">{{ mockStats.activeNow }}</span>
                                <span class="stat-label">Active Now</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">{{ mockStats.revenue }}</span>
                                <span class="stat-label">Revenue</span>
                            </div>
                        </div>
                    </MockMark>
                </section>

                <!-- Minimal Variant -->
                <section class="section">
                    <h2>Minimal Variant</h2>
                    <p class="description">Thin outline with corner label - less intrusive.</p>

                    <MockMark variant="minimal" label="Chart" description="Placeholder chart data">
                        <div class="chart-placeholder">
                            <div class="chart-bar" style="height: 60%" />
                            <div class="chart-bar" style="height: 80%" />
                            <div class="chart-bar" style="height: 45%" />
                            <div class="chart-bar" style="height: 90%" />
                            <div class="chart-bar" style="height: 70%" />
                        </div>
                    </MockMark>
                </section>

                <!-- Click Trigger Mode -->
                <section class="section">
                    <h2>Click Trigger Mode</h2>
                    <p class="description">Use tooltip-trigger="click" on the provider. Click the label to toggle tooltip.</p>

                    <MockMarkProvider tooltip-trigger="click">
                        <MockMark label="Clickable" reason="Click the label to see this tooltip! Click mode allows clicking through to content.">
                            <div class="card">
                                <h3>Click-to-Reveal Tooltip</h3>
                                <p>The tooltip only appears when the label is clicked.</p>
                            </div>
                        </MockMark>
                    </MockMarkProvider>
                </section>

                <!-- Disabled Indicator -->
                <section class="section">
                    <h2>Disabled Indicator</h2>
                    <p class="description">Use the disabled prop to hide indicators for specific instances.</p>

                    <MockMark :disabled="true" label="Hidden" reason="This won't show">
                        <div class="card">
                            <h3>Real Data Component</h3>
                            <p>This component uses real data, so the indicator is disabled.</p>
                        </div>
                    </MockMark>
                </section>

                <!-- Nested Indicators -->
                <section class="section">
                    <h2>Nested Indicators</h2>
                    <p class="description">MockMark works correctly when nested.</p>

                    <MockMark label="Outer" reason="Outer container mock">
                        <div class="nested-container">
                            <p>Outer mock container</p>
                            <MockMark variant="minimal" label="Inner" reason="Inner component mock">
                                <div class="card">
                                    <h3>Nested Content</h3>
                                    <p>This has its own indicator.</p>
                                </div>
                            </MockMark>
                        </div>
                    </MockMark>
                </section>

                <!-- Custom Colors -->
                <section class="section">
                    <h2>Custom Colors</h2>
                    <p class="description">Per-instance color overrides.</p>

                    <MockMark 
                        label="Custom" 
                        reason="Using custom purple theme"
                        label-bg="#8b5cf6"
                        border-color="#8b5cf6"
                        tooltip-bg="#1e1b4b"
                    >
                        <div class="card">
                            <h3>Custom Styled</h3>
                            <p>This MockMark uses custom purple colors.</p>
                        </div>
                    </MockMark>
                </section>
            </main>

            <footer class="footer">
                <p>Hover or click labels to see detailed mock reasons</p>
            </footer>
        </div>
    </MockMarkProvider>
</template>
