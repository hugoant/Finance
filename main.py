import matplotlib.pyplot as plt
import numpy as np


############## Modifier les paramètres ####################
initial = 70000
annee_initiale = 2022
rendement = 0.065
apport_mensuel = 500
nombre_annees = 50 # prendre un nombre suffisament grand
salaire_voulu = 1800
annee_naissance = 1972

############################################################
argent_place = [initial]
dividendes_mensuel = []

# randement de _% par an avec un apport initial d'argent
for i in range(1, nombre_annees):
    argent_place.append(argent_place[i-1] + argent_place[i-1]*rendement + apport_mensuel*12)

# salaire mensuel
for i in range(nombre_annees):
    dividendes_mensuel.append(argent_place[i]*rendement / 12)


X = [x + annee_initiale for x in range(nombre_annees)]

# faire un print pour voir toutes les valeurs: année | argent placé | salaire
TAB = []
for i in range(nombre_annees):
    TAB.append([X[i], argent_place[i], dividendes_mensuel[i]])
np.array(TAB)

############## On détermine quand on peut arréter de travailler    ########
i = 0
while dividendes_mensuel[i] < salaire_voulu:
    i+=1

print("Année : " + str(X[i]))
print("Vous aurez " + str(X[i] - annee_naissance) + " ans")
print("Salaire = " + str(np.round(dividendes_mensuel[i], 2)) + " €")
print("Argent placé = " + str(np.round(argent_place[i], 2)) + " €")
############################################################################


####### Affichage des graphiques #######
couleur = 'black'
style = '--'

plt.subplot(2, 1, 1) 
plt.title("Argent placé")
plt.ylabel("€")
plt.xlabel("années")
plt.step(X, argent_place)
plt.axhline(y=argent_place[i], color = couleur, linestyle = style)
plt.axvline(x=X[i], color = couleur, linestyle = style)
plt.text(X[i], argent_place[i], "(" + str(X[i]) + ", " + str(np.round(argent_place[i], 2)) + ")")
plt.ticklabel_format(style='plain')
plt.grid()

plt.subplot(2, 1, 2) 
plt.title("Dividendes mensuels")
plt.ylabel("€/mois")
plt.xlabel("années")
plt.step(X, dividendes_mensuel)
plt.axhline(y=dividendes_mensuel[i], color = couleur, linestyle = style)
plt.axvline(x=X[i], color = couleur, linestyle = style)
plt.text(X[i], dividendes_mensuel[i], "(" + str(X[i]) + ", " + str(np.round(dividendes_mensuel[i], 2)) + ")")
plt.ticklabel_format(style='plain')
plt.grid()

plt.tight_layout()

plt.show()

