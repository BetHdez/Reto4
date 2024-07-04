from flask import Flask, request, render_template, url_for

app = Flask(__name__)

# Simulación de almacenamiento de datos (normalmente esto estaría en una base de datos)
user_sessions = {}

def ussd_menu_page(session_id, message, user_input=''):
    return render_template('ussd_menu.html', session_id=session_id, message=message, user_input=user_input)

@app.route('/', methods=['GET', 'POST'])
def ussd_menu():
    session_id = request.form.get('session_id', 'new_session')
    user_input = request.form.get('user_input', '')
    cancel = request.form.get('cancel', '')

    if cancel == 'cancel':
        if session_id in user_sessions:
            del user_sessions[session_id]
        return ussd_menu_page('new_session', "Session cancelada")

    if session_id == 'new_session' or session_id not in user_sessions:
        session_id = str(len(user_sessions) + 1)
        user_sessions[session_id] = {'state': 'initial'}
        return ussd_menu_page(session_id, "Ingresa el codigo USSD (ejemplo: *133#)")

    state = user_sessions[session_id]['state']

    if state == 'initial':
        if user_input == '*133#':
            user_sessions[session_id]['state'] = 'main_menu'
            return ussd_menu_page(session_id, "Bienvenido al menu USSD. Seleccione una opción:\n1. Detalle Saldo \n2. Sin limite\n3. Internet Amigo")
        else:
            return ussd_menu_page(session_id, "Código USSD invalido .")

    elif state == 'main_menu':
        if user_input == '1':
            user_sessions[session_id]['state'] = 'account_info'
            return ussd_menu_page(session_id, "Saldo a consultar:\n1. Amigo\n2. Paq. Amigo Sin Limite\n3. Paq.Internet Amigo\n4. Paq. Internet por Tiempo")
        elif user_input == '2':
            user_sessions[session_id]['state'] = 'services'
            return ussd_menu_page(session_id, "Elige tu Paq.con Min y SMS ilimitados:\n1. +3GB x30 dias $200\n2. +1.3 GB x15 dias $100\n3. +500 GB x13 dias $80\n4. Saldo Paq Sin Limite")
        elif user_input == '3':
            del user_sessions[session_id]
            return ussd_menu_page(session_id, "Elige tus MB y navega:\n1. Paq.Internet por Tiempo\n2. 3.5 GB x30 dias $200\n3. 1.6 GB x15 dias $100\n4. 700MB x13 dias $80")
        else:
            return ussd_menu_page(session_id,  "Para realizar tu compra con tarjeta bancaria, \n elige la opcion:\n1. Recargas\n2. Pqts Amigo Sin Limite\n3. Pqts Internet Amigo\n4. Pqts Internet x Tiempo")

    elif state == 'account_info':
        if user_input == '1':
            return ussd_menu_page(session_id, "Tu saldo es de $20")
        elif user_input == '2':
            return ussd_menu_page(session_id, "Paq. Amigo Sin Limite.\n Tienes activo tu Paquete Amigo Sin Limite 20\n con MIN y SMS ilimitados  +100.00 MB, \n WA ilim y 200.00 MB para FB\n Vig 26/08/24 a las 23:59 hrs.")
        elif user_input == '3':
            user_sessions[session_id]['state'] = 'main_menu'
            return ussd_menu_page(session_id, "Paq. Internet por Amigo $100 x 15 dias 1.6 GB")
        elif user_input == '4':
             return ussd_menu_page(session_id, "Paq. Internet por Tiempo.\n MB ilimitados/ 1 hora (4GB) $10\n MB ilimitados/ 2 hora $15")
        else:
            return ussd_menu_page(session_id, "Seleccion invalida")

    elif state == 'services':
        if user_input == '1':
            return ussd_menu_page(session_id, "Dirigir a metodo de pago")
        elif user_input == '2':
            return ussd_menu_page(session_id, "Dirigir al metodo de pago")
        elif user_input == '3':
            return ussd_menu_page(session_id, "Dirigir al metodo de pago")
        elif user_input == '4':
            return ussd_menu_page(session_id, "Dirigir al metodo de pago")
        else:
            return ussd_menu_page(session_id, "Seleccion invalida")

    else:
        del user_sessions[session_id]
        return ussd_menu_page(session_id, "Error de codigo \nIngrese el código USSD para comenzar (por ejemplo, *133#):")

if __name__ == '__main__':
    app.run(debug=True)

