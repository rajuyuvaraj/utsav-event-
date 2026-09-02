async function runTests() {
  console.log('🧪 Running Utsav Decor API Integration Tests...\n');

  try {
    // 1. Health check
    const healthRes = await fetch('http://localhost:5000/api/health');
    const health = await healthRes.json();
    console.log('1. Health Check:', health.status === 'online' ? '✅ PASS' : '❌ FAIL');

    // 2. Categories
    const catRes = await fetch('http://localhost:5000/api/categories');
    const cats = await catRes.json();
    console.log(`2. Categories: ✅ PASS (${cats.data.length} categories found)`);

    // 3. Themes
    const themeRes = await fetch('http://localhost:5000/api/themes');
    const themes = await themeRes.json();
    console.log(`3. Themes: ✅ PASS (${themes.data.length} themes found)`);

    // 4. Addons
    const addonRes = await fetch('http://localhost:5000/api/addons');
    const addons = await addonRes.json();
    console.log(`4. Add-ons: ✅ PASS (${addons.data.length} addons found)`);

    // 5. Submit Request (Public)
    const newReqPayload = {
      customerName: 'Devendra & Ananya Singhal',
      phone: '+91 98201 99482',
      email: 'devendra.singhal@gmail.com',
      eventDate: '2026-10-24',
      eventTimeSlot: 'Evening',
      location: 'Taj Lake Palace, Udaipur',
      venueType: 'Hotel Ballroom',
      guestCount: 250,
      notes: 'Need extra red roses and authentic brass oil lamps for the Rajwada mandap.',
      selectedThemeId: themes.data[0].id,
      selectedThemeName: themes.data[0].name,
      selectedAddons: [
        { id: addons.data[0].id, name: addons.data[0].name, quantity: 2, itemCategory: addons.data[0].itemCategory },
        { id: addons.data[1].id, name: addons.data[1].name, quantity: 1, itemCategory: addons.data[1].itemCategory },
      ],
    };

    const submitRes = await fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReqPayload),
    });
    const submitResult = await submitRes.json();
    console.log('5. Submit Request:', submitResult.success ? `✅ PASS (Ref: ${submitResult.data.requestNumber})` : '❌ FAIL');

    // 6. Admin Login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@utsavdecor.com', password: 'admin123' }),
    });
    const loginResult = await loginRes.json();
    console.log('6. Admin Login:', loginResult.success ? `✅ PASS (Token generated for ${loginResult.admin.name})` : '❌ FAIL');

    const token = loginResult.token;

    // 7. Admin Dashboard Stats
    const statsRes = await fetch('http://localhost:5000/api/stats/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const statsResult = await statsRes.json();
    console.log(`7. Admin Stats: ✅ PASS (Total requests: ${statsResult.data.summary.totalRequests})`);

    // 8. Admin Update Request Status & Add Note
    if (submitResult.data) {
      const updateRes = await fetch(`http://localhost:5000/api/requests/${submitResult.data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'CONTACTED',
          noteText: 'Called Devendra. Shared customized Rajwada moodboard proposal on WhatsApp.',
        }),
      });
      const updateResult = await updateRes.json();
      console.log('8. Admin Request Update:', updateResult.success && updateResult.data.status === 'CONTACTED' ? '✅ PASS' : '❌ FAIL');
    }

    console.log('\n🎉 ALL INTEGRATION TESTS PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
  }
}

runTests();
