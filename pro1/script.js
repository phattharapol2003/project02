document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('login-result');

    if (!email || !password) {
        resultDiv.textContent = "กรุณากรอกอีเมลและรหัสผ่าน!";
        resultDiv.className = "error";
        return;
    }

    try {
        // ส่งข้อมูลไปยัง Backend
        const response = await fetch('http://20.255.155.79/ProjectCPE406SS2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.textContent = "เข้าสู่ระบบสำเร็จ!";
            resultDiv.className = "success";

            // เปลี่ยนหน้าไปยัง Home Page
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        } else {
            resultDiv.textContent = data.message || "เกิดข้อผิดพลาด!";
            resultDiv.className = "error";
        }
    } catch (error) {
        resultDiv.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อ!";
        resultDiv.className = "error";
        console.error('Error:', error);
    }
});
