document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.textContent = theme === 'dark' ? 'Light Mode☀️' : 'Dark Mode🌙';
    };
  
    setTheme(savedTheme);
  
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  
    // Navigation
    const toggleMenu = () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    };
  
    document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
  
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  
    // Animate Progress Bars
    const animateProgressBars = () => {
      document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.parentElement.getAttribute('data-percent');
        bar.style.width = width + '%';
      });
    };
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          if (entry.target.classList.contains('progress-bar')) {
            animateProgressBars();
          }
        }
      });
    }, { threshold: 0.1 });
  
    document.querySelectorAll('.card, .progress-container').forEach(el => {
      observer.observe(el);
    });
  
    // Form Handling
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
          }
        } catch (error) {
          alert('There was a problem sending your message. Please try again.');
        }
      });
    });
  });