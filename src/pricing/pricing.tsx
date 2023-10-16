import React from "react";
import { Box, Typography, Card, CardContent, CardActions, Button } from "@mui/material";

const plans = [
    {
        title: "Básico",
        price: "20",
        features: ["Acceso al gimnasio", "Clases grupales", "Duchas y vestuarios"],
    },
    {
        title: "Premium",
        price: "35",
        features: ["Acceso al gimnasio", "Clases grupales", "Duchas y vestuarios", "Entrenamiento personalizado", "Acceso a la piscina"],
    },
    {
        title: "VIP",
        price: "50",
        features: ["Acceso al gimnasio", "Clases grupales", "Duchas y vestuarios", "Entrenamiento personalizado", "Acceso a la piscina", "Sesiones de masaje", "Nutricionista"],
    },
];

const Pricing = () => {
    return (
        <Box sx={{ mt: "4rem", textAlign: "center", backgroundColor: "#fff", pb: 4 }}>
            <Typography variant="h4" color="white" mb={4}>Planes y precios</Typography>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                {plans.map((plan, index) => (
                    <Card key={index} sx={{ minWidth: 275, maxWidth: 350, mb: { xs: 4, md: 0 } }}>
                        <CardContent>
                            <Typography variant="h5" component="div" fontWeight="bold">{plan.title}</Typography>
                            <Typography variant="h6" color="text.secondary">${plan.price}/mes</Typography>
                            <Box mt={2}>
                                {plan.features.map((feature, idx) => (
                                    <Typography key={idx} variant="body2" component="p">{feature}</Typography>
                                ))}
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary">Comprar</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Pricing;