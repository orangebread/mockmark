import { Component, inject, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MockSeeComponent, MockSeeService } from "@mocksee/angular"

interface Advisor {
    id: number
    name: string
    specialty: string
    rating: number
}

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, MockSeeComponent],
    template: `
        <div class="app">
            <header class="header">
                <h1>MockSee Angular Demo</h1>
                <p>Development-only visual indicators for mock data</p>
            </header>

            <main class="main">
                <!-- Border Variant -->
                <section class="section">
                    <h2>Border Variant <span class="variant-tag">default</span></h2>
                    <p class="description">Wraps content with a dashed border and floating label.</p>

                    <mock-see label="Advisors" reason="Hardcoded mock data - not connected to API">
                        <div class="card-grid">
                            @for (advisor of mockAdvisors; track advisor.id) {
                                <div class="card">
                                    <h3>{{ advisor.name }}</h3>
                                    <p>{{ advisor.specialty }}</p>
                                    <div class="rating">★ {{ advisor.rating }}</div>
                                </div>
                            }
                        </div>
                    </mock-see>
                </section>

                <!-- Badge Variant -->
                <section class="section">
                    <h2>Badge Variant</h2>
                    <p class="description">Just the label badge, positioned absolutely.</p>

                    <mock-see variant="badge" label="Stats" reason="Static placeholder values">
                        <div class="stats-panel">
                            <div class="stat">
                                <span class="stat-value">{{ mockStats.totalUsers | number }}</span>
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
                    </mock-see>
                </section>

                <!-- Minimal Variant -->
                <section class="section">
                    <h2>Minimal Variant</h2>
                    <p class="description">Thin outline with corner label - less intrusive.</p>

                    <mock-see variant="minimal" label="Chart" description="Placeholder chart data">
                        <div class="chart-placeholder">
                            <div class="chart-bar" style="height: 60%"></div>
                            <div class="chart-bar" style="height: 80%"></div>
                            <div class="chart-bar" style="height: 45%"></div>
                            <div class="chart-bar" style="height: 90%"></div>
                            <div class="chart-bar" style="height: 70%"></div>
                        </div>
                    </mock-see>
                </section>

                <!-- Click Trigger Mode -->
                <section class="section">
                    <h2>Click Trigger Mode</h2>
                    <p class="description">Click the button to toggle between hover and click modes.</p>

                    <button class="mode-toggle" (click)="toggleClickMode()">
                        Current: {{ isClickMode ? 'Click' : 'Hover' }} Mode
                    </button>

                    <mock-see label="Clickable" reason="Click the label to see this tooltip! Click mode allows clicking through to content.">
                        <div class="card">
                            <h3>Click-to-Reveal Tooltip</h3>
                            <p>The tooltip appears based on the current trigger mode.</p>
                        </div>
                    </mock-see>
                </section>

                <!-- Disabled Indicator -->
                <section class="section">
                    <h2>Disabled Indicator</h2>
                    <p class="description">Use the disabled prop to hide indicators for specific instances.</p>

                    <mock-see [disabled]="true" label="Hidden" reason="This won't show">
                        <div class="card">
                            <h3>Real Data Component</h3>
                            <p>This component uses real data, so the indicator is disabled.</p>
                        </div>
                    </mock-see>
                </section>

                <!-- Nested Indicators -->
                <section class="section">
                    <h2>Nested Indicators</h2>
                    <p class="description">MockSee works correctly when nested.</p>

                    <mock-see label="Outer" reason="Outer container mock">
                        <div class="nested-container">
                            <p>Outer mock container</p>
                            <mock-see variant="minimal" label="Inner" reason="Inner component mock">
                                <div class="card">
                                    <h3>Nested Content</h3>
                                    <p>This has its own indicator.</p>
                                </div>
                            </mock-see>
                        </div>
                    </mock-see>
                </section>

                <!-- Custom Colors -->
                <section class="section">
                    <h2>Custom Colors</h2>
                    <p class="description">Per-instance color overrides.</p>

                    <mock-see 
                        label="Custom" 
                        reason="Using custom purple theme"
                        labelBg="#8b5cf6"
                        borderColor="#8b5cf6"
                        tooltipBg="#1e1b4b"
                    >
                        <div class="card">
                            <h3>Custom Styled</h3>
                            <p>This MockSee uses custom purple colors.</p>
                        </div>
                    </mock-see>
                </section>
            </main>

            <footer class="footer">
                <p>Hover or click labels to see detailed mock reasons</p>
            </footer>
        </div>
    `,
    styles: [`
        .mode-toggle {
            margin-bottom: 1rem;
            padding: 0.5rem 1rem;
            background: rgba(139, 92, 246, 0.2);
            border: 1px solid rgba(139, 92, 246, 0.5);
            border-radius: 6px;
            color: #a78bfa;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s;
        }
        .mode-toggle:hover {
            background: rgba(139, 92, 246, 0.3);
        }
    `],
})
export class AppComponent implements OnInit {
    private readonly mockMarkService = inject(MockSeeService)

    isClickMode = false

    mockAdvisors: Advisor[] = [
        { id: 1, name: "Sarah Chen", specialty: "Tarot", rating: 4.9 },
        { id: 2, name: "Marcus Webb", specialty: "Astrology", rating: 4.7 },
        { id: 3, name: "Luna Star", specialty: "Psychic", rating: 4.8 },
    ]

    mockStats = {
        totalUsers: 12450,
        activeNow: 342,
        revenue: "$45,230",
    }

    ngOnInit(): void {
        // Configure MockSee globally
        this.mockMarkService.configure({
            enabled: true,
            defaultVariant: "border",
            tooltipTrigger: "hover",
        })
    }

    toggleClickMode(): void {
        this.isClickMode = !this.isClickMode
        this.mockMarkService.configure({
            tooltipTrigger: this.isClickMode ? "click" : "hover",
        })
    }
}

