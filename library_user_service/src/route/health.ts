const route = (): Response => {
    const data = {
        status: "OK",
        timestamp: new Date().getTime(),
    };

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export { route };
