// MaiCa Landing Page Interactive Scripts

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeCounters();
    initializeFormHandling();
    initializeParallaxEffects();
});

// AI Design System Navbar effects
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class with AI styling
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Smooth hide/show with AI transition timing
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Hide navbar by moving it up
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)';
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
            // Show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    
                    // Update mobile menu button icon
                    const mobileMenuButton = document.getElementById('mobile-menu-button');
                    if (mobileMenuButton) {
                        const icon = mobileMenuButton.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
                
                const headerOffset = 128; // Banner (48px) + Navigation (80px)
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations with Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .benefit-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animated counters for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDollar = target.includes('$');
    const isTime = target.includes('/');
    
    let numericTarget;
    let suffix = '';
    
    if (isPercentage) {
        numericTarget = parseInt(target.replace('%', ''));
        suffix = '%';
    } else if (isDollar) {
        numericTarget = parseInt(target.replace('$', '').replace('K', '').replace('+', ''));
        suffix = 'K+';
    } else if (isTime) {
        element.textContent = target; // Don't animate time format
        return;
    } else {
        numericTarget = parseInt(target);
    }
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericTarget / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        if (isDollar) {
            element.textContent = `$${Math.floor(current)}${suffix}`;
        } else {
            element.textContent = `${Math.floor(current)}${suffix}`;
        }
    }, stepDuration);
}

// Demo access functionality - collect info first
function accessDemo() {
    // Track the interaction
    trackEvent('demo_access_clicked', { source: 'demo_button' });
    
    // Show the information collection modal
    showDemoInfoModal();
}

function showDemoInfoModal() {
    // Create modal overlay with AI design system
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-deep-charcoal/90 backdrop-blur-sm z-50 flex items-center justify-center p-6';
    
    // Create modal content with contact form
    modalOverlay.innerHTML = `
        <div class="bg-medium-gray border border-light-gray rounded-xl p-8 max-w-lg w-full animate-fade-in-up shadow-2xl">
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-electric-blue to-vivid-green rounded-xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-calendar-alt text-pure-white text-2xl"></i>
                </div>
                
                <h3 class="text-2xl font-bold text-pure-white mb-4">Access Demo</h3>
                
                <p class="text-soft-gray leading-relaxed">
                    Please provide your information to access the Maica demo
                </p>
            </div>
            
            <form id="demo-form" class="space-y-6">
                <div>
                    <label for="demo-name" class="block text-pure-white font-medium mb-2">
                        Full Name <span class="text-electric-blue">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="demo-name" 
                        name="name" 
                        required
                        class="w-full bg-deep-charcoal border border-light-gray text-pure-white px-4 py-3 rounded-lg focus:border-electric-blue focus:outline-none transition-colors duration-200"
                        placeholder="Enter your full name"
                    >
                </div>
                
                <div>
                    <label for="demo-phone" class="block text-pure-white font-medium mb-2">
                        Phone Number <span class="text-electric-blue">*</span>
                    </label>
                    <input 
                        type="tel" 
                        id="demo-phone" 
                        name="phone" 
                        required
                        class="w-full bg-deep-charcoal border border-light-gray text-pure-white px-4 py-3 rounded-lg focus:border-electric-blue focus:outline-none transition-colors duration-200"
                        placeholder="(555) 123-4567"
                    >
                </div>
                
                <div>
                    <label for="demo-email" class="block text-pure-white font-medium mb-2">
                        Email Address <span class="text-electric-blue">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="demo-email" 
                        name="email" 
                        required
                        class="w-full bg-deep-charcoal border border-light-gray text-pure-white px-4 py-3 rounded-lg focus:border-electric-blue focus:outline-none transition-colors duration-200"
                        placeholder="your@email.com"
                    >
                </div>
                
                <div>
                    <label for="demo-role" class="block text-pure-white font-medium mb-2">
                        I am a <span class="text-electric-blue">*</span>
                    </label>
                    <select 
                        id="demo-role" 
                        name="role" 
                        required
                        class="w-full bg-deep-charcoal border border-light-gray text-pure-white px-4 py-3 rounded-lg focus:border-electric-blue focus:outline-none transition-colors duration-200"
                    >
                        <option value="">Select your role</option>
                        <option value="hoa-board-member">HOA Board Member</option>
                        <option value="homeowner">Home Owner</option>
                        <option value="tenant">Tenant</option>
                    </select>
                </div>
                
                <div>
                    <label for="demo-address" class="block text-pure-white font-medium mb-2">
                        Property Address <span class="text-electric-blue">*</span>
                    </label>
                    <textarea 
                        id="demo-address" 
                        name="address" 
                        required
                        rows="3"
                        class="w-full bg-deep-charcoal border border-light-gray text-pure-white px-4 py-3 rounded-lg focus:border-electric-blue focus:outline-none transition-colors duration-200 resize-none"
                        placeholder="Enter the full address of your HOA property&#10;123 Main Street&#10;City, State 12345"
                    ></textarea>
                </div>
                
                <div class="pt-4">
                    <button 
                        type="submit" 
                        class="w-full bg-electric-blue text-pure-white px-6 py-4 rounded-lg font-bold hover:brightness-110 hover:scale-102 transition-all duration-200 mb-4"
                    >
                        Access Demo
                    </button>
                    
                    <button 
                        type="button"
                        onclick="closeModal()" 
                        class="w-full border-2 border-light-gray text-pure-white px-6 py-3 rounded-lg font-bold hover:bg-light-gray hover:scale-102 transition-all duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            
            <div class="mt-6 pt-6 border-t border-light-gray text-center">
                <p class="text-soft-gray text-sm mb-3">Questions? Call our demo line:</p>
                <div class="flex justify-center text-sm">
                    <a href="tel:747-898-0112" class="text-vivid-green hover:text-electric-blue transition-colors duration-200">
                        <i class="fas fa-headset mr-2"></i>747-898-0112
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Add form submission handling
    const form = document.getElementById('demo-form');
    form.addEventListener('submit', handleDemoAccessForm);
    
    // Store reference for closing
    window.currentModal = modalOverlay;
    
    // Track modal shown
    trackEvent('demo_access_modal_shown', { timestamp: Date.now() });
}

function closeModal() {
    if (window.currentModal) {
        document.body.removeChild(window.currentModal);
        document.body.style.overflow = 'auto';
        window.currentModal = null;
    }
}

// Handle demo access form submission
function handleDemoAccessForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Get form data
    const formData = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        role: form.role.value,
        address: form.address.value,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitButton.disabled = true;
    
    // Track form submission
    trackEvent('demo_form_submitted', formData);
    
    // Simulate form processing (replace with actual form handling)
    setTimeout(() => {
        // Show success and redirect to demo
        form.innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 bg-vivid-green/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-vivid-green text-2xl"></i>
                </div>
                <h4 class="text-xl font-bold text-pure-white mb-4">Information Submitted!</h4>
                <p class="text-soft-gray mb-6">
                    Thank you for providing your information. You will now be redirected to the Maica demo.
                </p>
                <button 
                    id="redirect-demo-btn"
                    class="bg-electric-blue text-pure-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all duration-200"
                >
                    Continue to Demo
                </button>
            </div>
        `;
        
        // Add click handler for demo redirect
        document.getElementById('redirect-demo-btn').addEventListener('click', function() {
            window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_3601k1vfsebqfrd8948djffd01k9', '_blank');
            closeModal();
        });
        
        // Auto-redirect after 3 seconds
        setTimeout(() => {
            window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_3601k1vfsebqfrd8948djffd01k9', '_blank');
            closeModal();
        }, 3000);
        
        // Track success
        trackEvent('demo_access_granted', { email: formData.email });
        
    }, 1000);
}

// Form handling (if any forms are added later)
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.innerHTML = '<span class="spinner mr-2"></span>Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                }, 2000);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 animate-fade-in-right ${
        type === 'success' ? 'bg-accent-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-primary-500'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${
                type === 'success' ? 'fa-check-circle' : 
                type === 'error' ? 'fa-exclamation-circle' : 
                'fa-info-circle'
            }"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Parallax effects for hero section
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && window.currentModal) {
        closeModal();
    }
});

// Page performance tracking
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Initialize any lazy-loaded content
    initializeLazyLoading();
});

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href*="elevenlabs.io"]')) {
        trackEvent('demo_link_clicked', { source: 'web_demo_button' });
    }
    
    if (e.target.closest('a[href^="tel:"]')) {
        trackEvent('phone_number_clicked', { number: e.target.href });
    }
    
    if (e.target.closest('a[href^="mailto:"]')) {
        trackEvent('email_clicked', { email: e.target.href });
    }
});

// FAQ Toggle Function
function toggleFAQ(faqId) {
    const faqContent = document.getElementById(faqId);
    const faqIcon = document.getElementById(faqId + '-icon');
    
    if (faqContent.classList.contains('hidden')) {
        faqContent.classList.remove('hidden');
        faqIcon.style.transform = 'rotate(180deg)';
    } else {
        faqContent.classList.add('hidden');
        faqIcon.style.transform = 'rotate(0deg)';
    }
}

// ROI Calculator Utilities
function formatCurrency(value, { minimumFractionDigits = 0, maximumFractionDigits = 0 } = {}) {
    if (!isFinite(value)) {
        return '$0';
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits,
        maximumFractionDigits
    }).format(value);
}

function formatNumber(value, digits = 0) {
    if (!isFinite(value)) {
        return '0';
    }

    return Number(value).toLocaleString('en-US', {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits
    });
}

function formatHours(value) {
    if (!isFinite(value)) {
        return '0 hours';
    }

    const rounded = Math.round(value * 10) / 10;
    const hasDecimal = Math.abs(rounded % 1) > 0;
    const display = hasDecimal ? rounded.toFixed(1) : formatNumber(rounded);
    return `${display} hours`;
}

function updateText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = text;
    }
}

// ROI Calculator Function
function calculateROI() {
    const units = parseFloat(document.getElementById('roiUnits')?.value) || 150;
    const inquiries = parseFloat(document.getElementById('roiInquiries')?.value) || 200;
    const hourlyRate = parseFloat(document.getElementById('roiHourlyRate')?.value) || 50;
    const managementFee = parseFloat(document.getElementById('roiManagementFee')?.value) || 1200;

    const callReductionRate = 0.96; // 96% call reduction
    const boardTimePerCall = 15; // minutes of board time per inquiry
    const managementEfficiencyGain = 0.4; // 40% reduction in management workload
    const maicaAnnualCostPerUnit = 29; // $29 per unit annually
    const maicaMonthlyCostPerUnit = maicaAnnualCostPerUnit / 12;

    const callsAutomated = Math.round(inquiries * callReductionRate);
    const boardHoursSaved = (inquiries * boardTimePerCall * callReductionRate) / 60;
    const boardTimeSavingsValue = boardHoursSaved * hourlyRate;
    const managementSavings = managementFee * managementEfficiencyGain;
    const totalMonthlySavings = boardTimeSavingsValue + managementSavings;

    const maicaMonthlyCost = units * maicaMonthlyCostPerUnit;
    const maicaAnnualCost = units * maicaAnnualCostPerUnit;

    const annualSavings = totalMonthlySavings * 12;
    const netAnnualSavings = annualSavings - maicaAnnualCost;
    const roiPercentage = maicaAnnualCost > 0 ? (netAnnualSavings / maicaAnnualCost) * 100 : 0;
    const paybackMonths = totalMonthlySavings > 0 ? maicaAnnualCost / totalMonthlySavings : Infinity;

    const monthlySavingsDisplay = formatCurrency(totalMonthlySavings);
    const timeSavedDisplay = formatHours(boardHoursSaved);
    const callsAutomatedDisplay = `${formatNumber(callsAutomated)} calls`;
    const timeValueDisplay = formatCurrency(boardTimeSavingsValue);
    const maicaMonthlyDisplay = formatCurrency(maicaMonthlyCost, { maximumFractionDigits: 0 });
    const annualSavingsDisplay = formatCurrency(annualSavings);
    const maicaAnnualDisplay = formatCurrency(maicaAnnualCost, { maximumFractionDigits: 0 });
    const netAnnualDisplay = formatCurrency(netAnnualSavings);
    const roiDisplay = `${formatNumber(Math.round(roiPercentage))}%`;
    const paybackDisplay = isFinite(paybackMonths) && paybackMonths > 0 ? paybackMonths.toFixed(1) : 'N/A';

    updateText('monthlySavings', monthlySavingsDisplay);
    updateText('timeSaved', timeSavedDisplay);
    updateText('callsAutomated', callsAutomatedDisplay);
    updateText('timeValue', timeValueDisplay);
    updateText('maicaMonthlyCost', maicaMonthlyDisplay);
    updateText('annualSavings', annualSavingsDisplay);
    updateText('maicaCost', maicaAnnualDisplay);
    updateText('netAnnualSavings', netAnnualDisplay);
    updateText('annualROI', roiDisplay);
    updateText('paybackPeriod', paybackDisplay);

    const boardTimeStep = `${formatNumber(inquiries)} inquiries × ${boardTimePerCall} minutes × 96% ÷ 60 = ${timeSavedDisplay}`;
    const timeValueStep = `${timeSavedDisplay} × ${formatCurrency(hourlyRate, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/hr = ${timeValueDisplay} in time value each month.`;
    const managementSavingsStep = `40% efficiency gain on ${formatCurrency(managementFee, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} management fees = ${formatCurrency(managementSavings)} saved monthly.`;
    const totalSavingsStep = `${timeValueDisplay} + ${formatCurrency(managementSavings)} = ${monthlySavingsDisplay} total monthly savings.`;
    const maicaCostStep = `${formatNumber(units)} units × $29/year ÷ 12 = ${formatCurrency(maicaMonthlyCost, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per month (${maicaAnnualDisplay} annually).`;
    const roiStep = `Annual ROI = (${annualSavingsDisplay} - ${maicaAnnualDisplay}) ÷ ${maicaAnnualDisplay} = ${roiDisplay}. Payback in ${paybackDisplay} months.`;

    updateText('boardTimeSavedStep', boardTimeStep);
    updateText('timeValueStep', timeValueStep);
    updateText('managementSavingsStep', managementSavingsStep);
    updateText('totalSavingsStep', totalSavingsStep);
    updateText('maicaCostStep', maicaCostStep);
    updateText('roiStep', roiStep);
}

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', function() {
    calculateROI();
});

// Export functions for global use
window.accessDemo = accessDemo;
window.closeModal = closeModal;
window.toggleFAQ = toggleFAQ;
window.calculateROI = calculateROI;