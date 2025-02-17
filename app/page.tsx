"use client";
export default function Home() {
    const doPayment = async () => {
        const url = "http://localhost:3030/init";
        // const url = "http://localhost:3000/api/sslcommers/payment";

        try {
            await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    window.location.href = result?.url;
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={doPayment}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Pay
            </button>
        </div>
    );
}
